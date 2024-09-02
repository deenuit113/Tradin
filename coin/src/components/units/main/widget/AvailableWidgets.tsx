import { FaBitcoin, FaEthereum, FaChartLine } from "react-icons/fa";

export const availableWidgets = [
    // 코인 가격 정보 위젯
    { type: 'bitcoin', name: '비트코인', icon: <FaBitcoin />, symbol: 'BITSTAMP:BTCUSD', category: 'crypto' },
    { type: 'ethereum', name: '이더리움', icon: <FaEthereum />, symbol: 'BITSTAMP:ETHUSD', category: 'crypto' },
    { type: 'tether', name: '테더', icon: <>USDT</>, symbol: 'BITSTAMP:USDTUSD', category: 'crypto' },
    { type: 'ripple', name: '리플', icon: <>XRP</>, symbol: 'BINANCE:XRPUSD', category: 'crypto' },
    { type: 'solana', name: '솔라나', icon: <>SOL</>, symbol: 'BINANCE:SOLUSD', category: 'crypto' },
    { type: 'dogecoin', name: '도지코인', icon: <>DOGE</>, symbol: 'BINANCE:DOGEUSD', category: 'crypto' },
    { type: 'cardano', name: '에이다', icon: <>ADA</>, symbol: 'BINANCE:ADAUSD', category: 'crypto' },
    // 데이터 시각화 위젯
    { type: 'binance', name: 'Binance 데이터 시각화', icon: <FaChartLine />, symbol: 'undefined', category: 'data' },
];