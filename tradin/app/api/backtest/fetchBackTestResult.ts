export const fetchBackTestResults = async (params: any) => {
    const response = await fetch('/api/backtest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};