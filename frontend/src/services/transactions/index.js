import toQueryString from '../../utils/strapiQuery';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


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

const PUT_completeTransaction = (id) => {
    return {
        url: `${BACKEND_URL}/api/transactions/${id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            data: {
                status: "completed"
            }
        }
    }
}



export { POST_createTransaction, GET_checkTransaction, PUT_completeTransaction };
