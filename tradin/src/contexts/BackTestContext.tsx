import React, { createContext, useContext, useState, useEffect } from 'react';
import { StrategyKey } from '../components/units/backtest/mockdata/MockStrategy';

interface SavedOption {
    name: string;
    option: string;
    description: string;
  }

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
    savedOptions: SavedOption[];
    saveOption: (name: string, option: string, description: string) => void;
    removeOption: (option: string) => void;
    savedMarketType: '선물' | '현물' | null;
    setSavedMarketType: React.Dispatch<React.SetStateAction<'선물' | '현물' | null>>;
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
    const [savedOptions, setSavedOptions] = useState<SavedOption[]>([]);
    const [savedMarketType, setSavedMarketType] = useState<'선물' | '현물' | null>(null);

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

    useEffect(() => { // 시장 유형을 바꿨을 때 전략이 초기화 되게
        if (!isInitialRender && marketType !== savedMarketType) {
            setSelectedStrategies([]);
            setPosition('long');
            setSavedMarketType(marketType);
        }
    }, [marketType, isInitialRender, savedMarketType]);

    useEffect(() => { // 저장된 옵션 불러오기
        const storedOptions = localStorage.getItem('savedBackTestOptions');
        if (storedOptions) {
            setSavedOptions(JSON.parse(storedOptions));
        }
    }, []);

    const saveOption = (name: string, description: string, option: string) => { // 실행한 옵션 저장
        const newOption = { name, description, option };
        setSavedOptions(prev => {
            const updated = [...prev, newOption];
            localStorage.setItem('savedBackTestOptions', JSON.stringify(updated));
            return updated;
        });
    };

    const removeSavedOption = (name: string) => { // 저장된 실행 옵션 저장
        setSavedOptions(prev => {
            const updated = prev.filter(opt => opt.name !== name);
            localStorage.setItem('savedBackTestOptions', JSON.stringify(updated));
            return updated;
        });
    };

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
            savedOptions,
            saveOption,
            removeOption: removeSavedOption,
            savedMarketType,
            setSavedMarketType,
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