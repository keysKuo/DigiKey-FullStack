const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const GET_categories = () => {
    return {
        url: `${BACKEND_URL}/api/categories`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    } 
}

export { GET_categories }