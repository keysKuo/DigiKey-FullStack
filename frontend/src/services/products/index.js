import toQueryString from '../../utils/strapiQuery';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const GET_productTypeDetail = (slug) => {
    const json = {
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: {
            image: {
                fields: ['url'],
            },
            category: {
                fields: ['categoryName']
            }
        },
        fields: ['typeName', 'typeId', 'originalPrice', 'sellPrice', 'status', 'slug'],
    };

    return {
        url: `${BACKEND_URL}/api/${toQueryString('product-types', json)}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

const GET_productTypes = () => {
    return {
        url: `${BACKEND_URL}/api/product-types?populate=*`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

const GET_relevantProductTypes = (categoryId) => {
    return {
        url: `${BACKEND_URL}/api/product-types?filters[category][$eq]=${categoryId}&fields[0]=typeId&fields[1]=slug`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

const GET_searchProductTypes = (keyword) => {
    const json = {
        filters: {
            typeName: {
                $contains: keyword,
            },
        },
        populate: {
            image: {
                fields: ['url'],
            },
            category: {
                fields: ['categoryName']
            }
        },
        fields: ['typeName', 'typeId', 'originalPrice', 'sellPrice', 'status', 'slug'],
    };
    
    return {
        url: `${BACKEND_URL}/api/${toQueryString('product-types', json)}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
};


export { GET_productTypes, GET_productTypeDetail, GET_relevantProductTypes, GET_searchProductTypes };
