import React, { createContext, useContext, useState, useEffect } from 'react';
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

interface BackTestProviderProps {
    children: React.ReactNode;
    initialMarketType: '선물' | '현물' | null;
    initialStrategies: StrategyKey[];
}

export const BackTestProvider: React.FC<BackTestProviderProps> = ({ 
    children, 
    initialMarketType, 
    initialStrategies 
}) => {
    const [selectedStrategies, setSelectedStrategies] = useState<StrategyKey[]>(initialStrategies);
    const [position, setPosition] = useState<string>('long');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [marketType, setMarketType] = useState<'선물' | '현물' | null>(initialMarketType);
    const [isInitialRender, setIsInitialRender] = useState(initialStrategies.length === 0);

    useEffect(() => {
        setSelectedStrategies(initialStrategies);
        setMarketType(initialMarketType);

        const end = new Date();
        const start = new Date();
        start.setFullYear(start.getFullYear() - 1);
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);

        setIsInitialRender(false);
    }, [initialMarketType, initialStrategies]);

    useEffect(() => {
        if (!isInitialRender && marketType !== initialMarketType) {
            setSelectedStrategies([]);
            setPosition('long');
        }
    }, [marketType, isInitialRender, initialMarketType]);

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