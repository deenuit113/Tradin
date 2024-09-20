import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { darkMode } from '../../../commons/util/atoms';

declare global {
    interface Window {
        TradingView: any;
    }
}

interface CoinChartProps {
    symbol: string;
}

const CoinChart: React.FC<CoinChartProps> = ({ symbol }) => {
    const [isDarkMode] = useRecoilState(darkMode);

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
                theme: isDarkMode? 'dark': 'light', // light
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
  }, [symbol, isDarkMode]);

    return (
        <div id="tradingview_1" />
    );
};

export default CoinChart;