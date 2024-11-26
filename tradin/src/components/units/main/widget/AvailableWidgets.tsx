import { FaBitcoin, FaChartBar, FaChartLine, FaChartPie, FaEthereum } from "react-icons/fa";

export const cryptoWidgets = [
    { type: 'bitcoin', name: '비트코인', icon: <FaBitcoin />, symbol: 'BITSTAMP:BTCUSD' },
    { type: 'ethereum', name: '이더리움', icon: <FaEthereum />, symbol: 'BITSTAMP:ETHUSD' },
    { type: 'tether', name: '테더', icon: <>USDT</>, symbol: 'BITSTAMP:USDTUSD' },
    { type: 'ripple', name: '리플', icon: <>XRP</>, symbol: 'BINANCE:XRPUSD' },
    { type: 'solana', name: '솔라나', icon: <>SOL</>, symbol: 'BINANCE:SOLUSD' },
    { type: 'dogecoin', name: '도지코인', icon: <>DOGE</>, symbol: 'BINANCE:DOGEUSD' },
    { type: 'cardano', name: '에이다', icon: <>ADA</>, symbol: 'BINANCE:ADAUSD' },
];

export const dataWidgets = [
    { type: 'longshortratio', name: 'BTC 선물 롱/숏 비율', icon: <FaChartBar/> },
    { type: 'feargreedindex', name: '공포 / 탐욕 지수', icon: <FaChartPie/> },
    { type: 'btcrsiindex', name: 'BTC RSI', icon: <FaChartLine/> },
    { type: 'test', name: 'test', icon: <></> },
];