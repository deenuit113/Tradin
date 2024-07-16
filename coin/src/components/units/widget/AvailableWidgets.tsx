import { FaBitcoin, FaEthereum } from "react-icons/fa";

export const availableWidgets = [
    { type: 'bitcoin', name: '비트코인', icon: <FaBitcoin /> },
    { type: 'ethereum', name: '이더리움', icon: <FaEthereum /> },
    { type: 'tether', name: '테더', icon: <>USDT</> },
    { type: 'ripple', name: '리플', icon: <>XRP</> },
    { type: 'solana', name: '솔라나', icon: <>SOL</> },
    { type: 'dogecoin', name: '도지코인', icon: <>DOGE</> },
    // 필요한 경우 다른 코인도 추가
];
