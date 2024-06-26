const express = require('express');
const { exchangeRate, createPaypalSession, createStripeSession, sendMail, mailForm, getPaymentDetails } = require('../services');
const configs = require('../configs');
const router = express.Router();
const axios = require('axios');

router.post('/checkout', async (req, res, next) => {
    const { paymentType, products, total, transactionId } = req.body;
    const rate = await exchangeRate('vnd', 'usd');

    const options = {
        items: products.map((product) => {
            return {
                name: product.typeName,
                price: product.sellPrice * rate,
                quantity: product.qty,
            };
        }),
        total: total * rate,
        success_url: `${configs['frontendURL']}/checkout/success/${transactionId}`,
        cancel_url: `${configs['frontendURL']}/cart`,
    };

    let payment = {};

    switch (paymentType) {
        case 'stripe':
            payment = await createStripeSession(options);
            break;
        case 'paypal':
            payment = await createPaypalSession(options);
            break;
        default:
            return res.status(403).json({
                success: false,
                msg: 'Phương thức thanh toán không hợp lệ',
            });
    }

    if (!payment) {
        return res.status(500).json({
            success: false,
            msg: 'Tạo phiên thanh toán thất bại',
        });
    }

    return res.status(200).json({
        success: true,
        payment,
        msg: 'Tạo phiên thanh toán thành công',
    });
})

router.post('/sendmail', async (req, res, next) => {
    sendMail({
        to: "nkeyskuo124@gmail.com",
        subject: 'Thông tin đơn hàng TS351983',
        text: `Xin chào Kuo Nhan Dung`,
        html: mailForm({
            logo_link: process.env.LOGO_LINK || '',
            caption: `Thông tin đơn hàng TS351983`,
            content: `
                    <div style="padding: 0 10px">
                        <h4>Xin chào Kuo Nhan Dung </h4>
                        <h5>Đây là thông tin đơn hàng của bạn</h5>
                    </div>
                `,
        }),
    });
})

router.get('/payment-details/:transactionId', async (req, res, next) => {
    const { transactionId } = req.params;

    const options = {
        url: `http://127.0.0.1:4021/api/transactions?filters[transactionId][$eq]=${transactionId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const transaction = await axios.request(options)
        .then(response => response.data.data)
        .then(result => {
            // console.log(result);
            if (result.length !== 0) {
                return {
                    ...result[0].attributes, id: result[0].id
                };
            }
        })
        .catch(err => {
            console.log(err);
        })

    if (!transaction) {
        return res.status(404).json({
            success: false,
            msg: 'Giao dịch không tồn tại'
        })
    }
        
    return await getPaymentDetails(transaction.paymentType, transaction.paymentId)
        .then(payment => {
            return res.status(200).json({
                success: true,
                msg: 'Giao dịch đã thành công',
                payment,
                transaction
            });
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                msg: 'Giao dịch thất bại',
                msg: err
            });
        })
})

module.exports = router;