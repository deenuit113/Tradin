import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { StrategyKey } from '../components/units/backtest/mockdata/MockStrategy';

interface BackTestContextType {
    selectedStrategies: StrategyKey[];
    setSelectedStrategies: React.Dispatch<React.SetStateAction<StrategyKey[]>>;
    position: string;
    setPosition: React.Dispatch<React.SetStateAction<string>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    marketType: '선물' | '현물' | null;
    setMarketType: React.Dispatch<React.SetStateAction<'선물' | '현물' | null>>;
    isInitialRender: boolean;
    setIsInitialRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const BackTestContext = createContext<BackTestContextType | undefined>(undefined);

export const BackTestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const searchParams = useSearchParams();
    const [selectedStrategies, setSelectedStrategies] = useState<StrategyKey[]>([]);
    const [position, setPosition] = useState<string>('long');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [marketType, setMarketType] = useState<'선물' | '현물' | null>(null);
    const [isInitialRender, setIsInitialRender] = useState(true);

    useEffect(() => { // 상태 초기화
        const initialMarketType = searchParams.get('marketType') === 'spot' ? '현물' : 
                                  searchParams.get('marketType') === 'futures' ? '선물' : null;
        const initialStrategies = searchParams.get('strategies')?.split(',').map(num => {
            const prefix = initialMarketType === '현물' ? 'S' : 'F';
            return `${prefix}${num}` as StrategyKey;
        }).filter(Boolean) || [];

        if (initialStrategies.length > 0) {
            setSelectedStrategies(initialStrategies);
            setIsInitialRender(false);
        }

        setMarketType(initialMarketType);

        const end = new Date();
        const start = new Date();
        start.setFullYear(start.getFullYear() - 1);
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
    }, [searchParams]);

    useEffect(() => {
        if (!isInitialRender) {
            setSelectedStrategies([]);
            setPosition('long');
        }
    }, [marketType, isInitialRender]);

    return (
        <BackTestContext.Provider value={{
            selectedStrategies,
            setSelectedStrategies,
            position,
            setPosition,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            marketType,
            setMarketType,
            isInitialRender,
            setIsInitialRender,
        }}>
            {children}
        </BackTestContext.Provider>
    );
};

export const useBackTestContext = () => {
    const context = useContext(BackTestContext);
    if (context === undefined) {
        throw new Error('useBackTestContext must be used within a BackTestProvider');
    }
    return context;
};