import React, { useState } from 'react';
import CoinChart from '../../src/components/units/chart/CoinChart';

const TestPage: React.FC = () => {
    const [selectedCoin, setSelectedCoin] = useState('BITSTAMP:BTCUSD');

    return (
        <div>
            <h1>코인 차트</h1>
            <select onChange={(e) => setSelectedCoin(e.target.value)} value={selectedCoin}>
                <option value="BITSTAMP:BTCUSD">Bitcoin</option>
                <option value="BITSTAMP:ETHUSD">Ethereum</option>
                <option value="BITSTAMP:USDTUSD">Tether</option>
                <option value="BINANCE:XRPUSD">Ripple</option>
                <option value="BINANCE:SOLUSD">Solana</option>
                <option value="BINANCE:DOGEUSD">Dogecoin</option>
                <option value="BINANCE:ADAUSD">Cardano</option>
            </select>
            <CoinChart symbol={selectedCoin} />
        </div>
    );
};

export default TestPage;