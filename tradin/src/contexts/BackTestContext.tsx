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
    updateOptionName: (oldName: string, newName: string) => void;
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
    const [marketType, setMarketType] = useState<'선물' | '현물' | null>(initialMarketType);
    const [position, setPosition] = useState<string>('long');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [isInitialRender, setIsInitialRender] = useState(initialStrategies.length === 0 ? false : true);
    const [savedOptions, setSavedOptions] = useState<SavedOption[]>([]);
    const [savedMarketType, setSavedMarketType] = useState<'선물' | '현물' | null>(null);
    
    useEffect(() => {
        const end = new Date();
        const start = new Date();
        start.setFullYear(start.getFullYear() - 1);
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
    }, []);

    useEffect(() => { // 시장 유형을 바꿨을 때 전략이 초기화 되게
        if (!isInitialRender) {
            setSelectedStrategies([]);
            setSavedMarketType(marketType);
            console.log(position)
        } else {
            setIsInitialRender(false);
        }
    }, [marketType]);

    useEffect(() => { // 저장된 옵션 불러오기
        const storedOptions = localStorage.getItem('savedBackTestOptions');
        if (storedOptions) {
            setSavedOptions(JSON.parse(storedOptions));
        }
    }, []);

    const saveOption = (name: string, description: string, option: string) => {
        const newOption = { name, description, option };
        setSavedOptions(prev => {
            // 이미 저장된 옵션인지 확인
            const isDuplicate = prev.some(savedOption => 
                savedOption.option === option
            );
    
            if (isDuplicate) {
                alert("이미 저장된 옵션입니다.");
                return prev; // 중복된 경우 기존 배열을 그대로 반환
            }
    
            // 중복이 아닌 경우 새 옵션 추가
            const updated = [...prev, newOption];
            localStorage.setItem('savedBackTestOptions', JSON.stringify(updated));
            return updated;
        });
    };

    const updateOptionName = (oldName: string, newName: string) => {
        setSavedOptions(prev => {
            const updated = prev.map(opt => 
                opt.name === oldName ? { ...opt, name: newName } : opt
            );
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
            updateOptionName,
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