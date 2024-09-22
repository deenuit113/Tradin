import { StrategyKey } from "../mockdata/MockStrategy";

export interface OptionsContainerProps {
    isVisible: boolean;
    selectedStrategies: StrategyKey[];
    handleStrategyChange: (strategy: StrategyKey) => void;
    position: string;
    setPosition: (position: 'long' | 'short') => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    performBackTest: () => void;
    loading: boolean;
    showToggleButton: boolean;
    marketType: '선물' | '현물' | null;
    setMarketType: (type: '선물' | '현물' | null) => void;
    setSelectedStrategies: React.Dispatch<React.SetStateAction<StrategyKey[]>>;
    initialStrategies: StrategyKey[];
}
