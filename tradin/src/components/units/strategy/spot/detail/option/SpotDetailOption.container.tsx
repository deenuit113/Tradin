import React, { useEffect, useState, useMemo } from 'react';
import * as S from "../../../ItemDetailOption.styles";
import { useRouter } from 'next/navigation';
import { StrategyOptionProps } from './SpotDetailOption.types';
import SpotDetailOptionUI from './SpotDetailOption.presenter';

const filtersList = [
    { key: "coin", label: "코인", mandatory: true },
    { key: "position", label: "포지션", mandatory: true },
    { key: "entryPrice", label: "진입가격", mandatory: true },
    { key: "profitLoss", label: "누적 손익", mandatory: false },
    { key: "winRate", label: "승률", mandatory: false },
    { key: "profitFactor", label: "수익 팩터", mandatory: false },
    { key: "trades", label: "횟수", mandatory: false },
    { key: "averageBars", label: "평균 봉수", mandatory: false },
    { key: "averageProfit", label: "평균 수익", mandatory: false }
];

export default function SpotDetailOption({
    isMenuOpen,
    availableOptions,
    selectedOption,
    handleCheckboxChange,
    filters,
    handleFilterChange,
    currentStrategy
}: StrategyOptionProps): JSX.Element {
    const router = useRouter();
    const [localFilters, setLocalFilters] = useState<{ [key: string]: boolean }>(filters);

    useEffect(() => {
        const savedFilters = localStorage.getItem('SpotDetailFilters');
        if (savedFilters) {
            const parsedFilters = JSON.parse(savedFilters) as { [key: string]: boolean };
            setLocalFilters(parsedFilters);
            
            Object.entries(parsedFilters).forEach(([key, value]) => {
                if (filters[key] !== value) {
                    handleFilterChange(key);
                }
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('SpotDetailFilters', JSON.stringify(localFilters));
    }, [localFilters]);

    useEffect(() => {
        setLocalFilters(prevFilters => ({...prevFilters, ...filters}));
    }, [filters]);

    const handleLocalFilterChange = (key: string) => {
        setLocalFilters(prev => ({ ...prev, [key]: !prev[key] }));
        handleFilterChange(key);
    };

    const handleBackTestClick = () => {
        const strategies = [currentStrategy];
        if (selectedOption !== null) {
            strategies.push(selectedOption);
        }
        
        const queryParams = new URLSearchParams({
            marketType: 'spot',
            strategies: strategies.join(',')
        });
        
        router.push(`/backtest?${queryParams.toString()}`);
    };

    return(
        <>
            <SpotDetailOptionUI
                filtersList={filtersList}
                localFilters={localFilters}
                handleLocalFilterChange={handleLocalFilterChange}
                isMenuOpen={isMenuOpen}
                availableOptions={availableOptions}
                selectedOption={selectedOption}
                handleCheckboxChange={handleCheckboxChange}
                handleBackTestClick={handleBackTestClick}
            />
        </>
    );
}