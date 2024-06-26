const express = require('express');
const { exchangeRate, createPaypalSession, createStripeSession, sendMail, mailForm } = require('../services');
const configs = require('../configs');
const router = express.Router();

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

    let session_url = '';

    switch (paymentType) {
        case 'stripe':
            session_url = await createStripeSession(options);
            break;
        case 'paypal':
            session_url = await createPaypalSession(options);
            break;
        default:
            return res.status(403).json({
                success: false,
                msg: 'Phương thức thanh toán không hợp lệ',
            });
    }

    if (!session_url) {
        return res.status(500).json({
            success: false,
            msg: 'Tạo phiên thanh toán thất bại',
        });
    }

    return res.status(200).json({
        success: true,
        session_url,
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

module.exports = router;