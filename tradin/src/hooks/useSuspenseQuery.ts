import { useState, useEffect } from 'react';

export const useSuspenseQuery = <T>(queryFn: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const result = await queryFn();
                if (isMounted) setData(result);
            } catch (e) {
                if (isMounted) setError(e);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [queryFn]);

    if (error) throw error;
    if (!data) throw new Promise<void>((resolve) => setTimeout(resolve, 0));
    return data;
};