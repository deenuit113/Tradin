import { FaBitcoin, FaEthereum } from "react-icons/fa";

export const availableWidgets = [
    { type: 'bitcoin', name: '비트코인', icon: <FaBitcoin />, symbol: 'BITSTAMP:BTCUSD' },
    { type: 'ethereum', name: '이더리움', icon: <FaEthereum />, symbol: 'BITSTAMP:ETHUSD' },
    { type: 'tether', name: '테더', icon: <>USDT</>, symbol: 'BITSTAMP:USDTUSD' },
    { type: 'ripple', name: '리플', icon: <>XRP</>, symbol: 'BINANCE:XRPUSD' },
    { type: 'solana', name: '솔라나', icon: <>SOL</>, symbol: 'BINANCE:SOLUSD' },
    { type: 'dogecoin', name: '도지코인', icon: <>DOGE</>, symbol: 'BINANCE:DOGEUSD' },
    { type: 'cardano', name: '에이다', icon: <>ADA</>, symbol: 'BINANCE:ADAUSD' },
    // 필요한 경우 다른 코인도 추가
];