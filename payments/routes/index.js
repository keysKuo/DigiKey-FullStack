const express = require("express");
const {
	exchangeRate,
	createPaypalSession,
	createStripeSession,
	sendMail,
	mailForm,
	getPaymentDetails,
    toQueryString,
} = require("../services");
const configs = require("../configs");
const router = express.Router();
const axios = require("axios");
const BACKEND_URL = process.env.BACKEND_URL || `http://127.0.0.1:4021`

router.post("/checkout", async (req, res, next) => {
	const { paymentType, products, total, transactionId } = req.body;
	const rate = await exchangeRate("vnd", "usd");

	const options = {
		items: products.map((product) => {
			return {
				name: product.typeName,
				price: product.sellPrice * rate,
				quantity: product.qty,
			};
		}),
		total: total * rate,
		success_url: `${configs["frontendURL"]}/checkout/success/${transactionId}`,
		cancel_url: `${configs["frontendURL"]}/cart`,
	};

	let payment = {};

	switch (paymentType) {
		case "stripe":
			payment = await createStripeSession(options);
			break;
		case "paypal":
			payment = await createPaypalSession(options);
			break;
		default:
			return res.status(403).json({
				success: false,
				msg: "Phương thức thanh toán không hợp lệ",
			});
	}

	if (!payment) {
		return res.status(500).json({
			success: false,
			msg: "Tạo phiên thanh toán thất bại",
		});
	}

	return res.status(200).json({
		success: true,
		payment,
		msg: "Tạo phiên thanh toán thành công",
	});
});


/*
    1. GET Transaction Detail (transactionId)
    2. Check if Payments completed (paymentType, paymentId)
    3. Update products status to sold ([id])
    4. Get DecryptedData of Products ([id])
    5. Send products to customer (email, transactionId, decryptedDatas)
*/
router.get("/payment-details/:transactionId", async (req, res, next) => {
	const { transactionId } = req.params;

    //  <-- Get Transaction Details
	const options = {
		url: `${BACKEND_URL}/api/transactions?filters[transactionId][$eq]=${transactionId}&populate=products.items`,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};
	const transaction = await axios
		.request(options)
		.then((response) => response.data.data)
		.then((result) => {
			// console.log(result);
			if (result.length !== 0) {
				return {
					...result[0].attributes,
					id: result[0].id,
				};
			}
		})
		.catch((err) => {
			console.log(err);
		});
    // ----------------------->

	if (!transaction) {
		return res.status(404).json({
			success: false,
			msg: "Giao dịch không tồn tại",
		});
	}

    //  <-- Check If Payment completed
	return await getPaymentDetails(
		transaction.paymentType,
		transaction.paymentId
	)
		.then(async (payment) => {
			const products = [];
			transaction.products.forEach((prod) => {
                prod.items.data.forEach((item) => {
                    //  <-- Update products status to sold
                    axios.request({
                        url: `${BACKEND_URL}/api/products/${item.id}`,
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: {
                            data: {
                                status: 'sold'
                            }
                    }})
                    // ----------------------->

					products.push(item.id);
				});
			});

            //  <-- Get DecryptedData of Products
            const json = { filters: { id: { $in: products } } };
			const options = {
                url: `${BACKEND_URL}/api/${toQueryString('products', json)}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const prods = await axios
                .request(options)
                .then((response) => response.data.data)
                .then((result) => {
                    if (result.length !== 0) {
                        return result.map(r => r.attributes.encryptedData);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            // ----------------------->
            
            let html = "";
            prods.forEach(p => {
                html += `<div>${p}</div>`
            })

            //  <-- Send products to customer
            sendMail({
                to: transaction.email,
                subject: `Thông tin đơn hàng ${transaction.transactionId}`,
                html: mailForm({
                    logo_link: process.env.LOGO_LINK || '',
                    caption: `Thông tin đơn hàng ${transaction.transactionId}`,
                    content: `
                            <div style="padding: 0 10px">
                                <h5>Đây là thông tin đơn hàng của bạn</h5>
                                ${html}
                                <div style="padding: 10px"></div>
                            </div>
                        `,
                }),
            });
            // ----------------------->

			return res.status(200).json({
				success: true,
				msg: "Giao dịch đã thành công",
				payment,
				transaction,
			});
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				msg: "Giao dịch thất bại",
				msg: err,
			});
		});
        // ----------------------->
});

module.exports = router;
