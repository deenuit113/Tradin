import React, { useEffect } from 'react';

declare global {
    interface Window {
        TradingView: any;
    }
}

interface CoinChartProps {
    symbol: string;
    $darkMode: boolean;
}

const CoinChart: React.FC<CoinChartProps> = ({ symbol, $darkMode }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            new window.TradingView.widget({
                width: 600,
                height: 360,
                symbol: symbol,
                interval: 'D',
                timezone: 'Asia/Seoul',
                theme: $darkMode? 'light': 'dark', // light
                style: '1',
                locale: 'kr',
                toolbar_bg: '#f1f3f6',
                enable_publishing: false,
                allow_symbol_change: true,
                container_id: 'tradingview_1',
            });
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
  }, [symbol, $darkMode]);

    return (
        <div id="tradingview_1" />
    );
};

export default CoinChart;