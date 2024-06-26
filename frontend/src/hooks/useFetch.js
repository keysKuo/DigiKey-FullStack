import axios from 'axios';
import { useState } from 'react';

export default function useFetch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = async (options) => {
        setLoading(true);
        return await axios
            .request(options)
            .then((response) => response.data.data)
            .then((result) =>
                result.map((res) => {
                    return { ...res.attributes, id: res.id };
                }),
            )
            .catch((err) => {
                setError(err?.response?.data?.message || 'Error occured!');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { fetch, loading, error };
}
