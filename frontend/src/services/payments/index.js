const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;

const GET_checkPaymentDetail = (transactionId) => {
    return {
        url: `${PAYMENT_URL}/payments/v1/payment-details/${transactionId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
}


const POST_createPayment = (paymentType, products, total, transactionId) => {
    return {
        url: `${PAYMENT_URL}/payments/v1/checkout`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({paymentType, products, total, transactionId})
    }
}

export { POST_createPayment, GET_checkPaymentDetail };
