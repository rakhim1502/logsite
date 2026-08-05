import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

export const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const optionsRef = useRef(options);

    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(url, optionsRef.current);
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        let isMounted = true;

        // Eslint xatosini yo'qotish uchun chaqiruvni asinxron (soxta) render tsikliga o'tkazamiz
        const executeFetch = async () => {
            if (isMounted) {
                await fetchData();
            }
        };

        executeFetch();

        return () => {
            isMounted = false;
        };
    }, [fetchData]); // Endi sinxron cascading render xavfi yo'qoladi

    return { data, loading, error, refetch: fetchData };
};