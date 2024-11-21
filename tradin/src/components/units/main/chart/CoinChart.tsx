import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useColorMode } from '@/components/ui/color-mode';

declare global {
    interface Window {
        TradingView: any;
    }
}

interface CoinChartProps {
    symbol: string;
}

const CoinChart: React.FC<CoinChartProps> = ({ symbol }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 600, height: 360 });
    const { colorMode } = useColorMode();


    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => createWidget();

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [symbol, colorMode, dimensions]);

    const createWidget = () => {
        if (window.TradingView) {
            new window.TradingView.widget({
                width: dimensions.width,
                height: dimensions.height,
                symbol: symbol,
                interval: 'D',
                timezone: 'Asia/Seoul',
                theme: colorMode === 'dark' ? 'dark' : 'light',
                style: '1',
                locale: 'kr',
                toolbar_bg: '#f1f3f6',
                enable_publishing: false,
                allow_symbol_change: true,
                container_id: 'tradingview_1',
            });
        }
    };

    return (
        <Box ref={containerRef} style={{ width: '100%', height: '100%' }}>
            <div id="tradingview_1" />
        </Box>
    );
};

export default CoinChart;