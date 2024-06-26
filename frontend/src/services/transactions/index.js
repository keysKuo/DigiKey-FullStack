import toQueryString from '../../utils/strapiQuery';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;

const POST_createTransaction = (data) => {
    return {
        url: `${BACKEND_URL}/api/transactions`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };
};

const GET_checkTransaction = (id) => {
    const json = {
        filters: {
            transactionId: {
                $eq: id,
            },
        },
        fields: ['transactionId', 'total', 'paymentType', 'status'],
    };

    return {
        url: `${BACKEND_URL}/api/${toQueryString('transactions', json)}`,
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


export { POST_createTransaction, GET_checkTransaction, POST_createPayment };
