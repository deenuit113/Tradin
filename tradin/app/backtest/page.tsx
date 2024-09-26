'use client';

import BackTestPage from "../../src/components/units/backtest/main/BackTest";
import { BackTestProvider } from "../../src/contexts/BackTestContext";
import { useSearchParams } from "next/navigation";
import { StrategyKey } from "../../src/components/units/backtest/mockdata/MockStrategy";

export default function BackTest() {
    const searchParams = useSearchParams();
    const initialMarketType = searchParams.get('marketType') === 'spot' ? '현물' :
                              searchParams.get('marketType') === 'futures' ? '선물' : null;
    const initialStrategies = searchParams.get('strategies')?.split(',').map(num => {
        const prefix = initialMarketType === '현물' ? 'S' : 'F';
        return `${prefix}${num}` as StrategyKey;
    }).filter(Boolean) || [];

    return (
        <BackTestProvider
            initialMarketType={initialMarketType} 
            initialStrategies={initialStrategies}
            >
            <BackTestPage />
        </BackTestProvider>
    );
}