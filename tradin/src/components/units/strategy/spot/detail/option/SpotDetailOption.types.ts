export interface StrategyOptionProps {
    isMenuOpen: boolean;
    availableOptions: number[];
    selectedOption: number | null;
    handleCheckboxChange: (n: number) => void;
    filters: { [key: string]: boolean };
    handleFilterChange: (key: string) => void;
    currentStrategy: number;
}

interface filterList {
    key: string;
    label: string;
    mandatory: boolean;
}

export interface LocalFilters {
    [key: string]: boolean;
}

export interface SpotDetailOptionUIProps {
    filtersList: filterList[];
    localFilters: LocalFilters;
    handleLocalFilterChange: (key: string) => void;
    isMenuOpen: boolean;
    availableOptions: number[];
    selectedOption: number | null;
    handleCheckboxChange: (option: number) => void;
    handleBackTestClick: () => void;
}