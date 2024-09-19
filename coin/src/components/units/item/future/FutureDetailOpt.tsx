import React, { useEffect, useState, useMemo } from 'react';
import * as S from "../ItemDetail.styles";
import { useRouter } from 'next/navigation';

interface StrategyOptionProps {
    isMenuOpen: boolean;
    availableOptions: number[];
    selectedOption: number | null;
    handleCheckboxChange: (n: number) => void;
    filters: { [key: string]: boolean };
    handleFilterChange: (key: string, value: boolean) => void;
    currentStrategy: number;
}

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

export default function FutureDetailOption({
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
        const savedFilters = localStorage.getItem('FutureDetailFilters');
        if (savedFilters) {
            const parsedFilters = JSON.parse(savedFilters) as { [key: string]: boolean };
            setLocalFilters(parsedFilters);
            
            Object.entries(parsedFilters).forEach(([key, value]) => {
                if (filters[key] !== value) {
                    handleFilterChange(key, value);
                }
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('FutureDetailFilters', JSON.stringify(localFilters));
    }, [localFilters]);

    useEffect(() => {
        setLocalFilters(prevFilters => ({...prevFilters, ...filters}));
    }, [filters]);

    const handleLocalFilterChange = (key: string) => {
        const newValue = !localFilters[key];
        setLocalFilters(prev => ({ ...prev, [key]: newValue }));
        handleFilterChange(key, newValue);
    };
    
    const handleBackTestClick = () => {
        const strategies = [currentStrategy];
        if (selectedOption !== null) {
            strategies.push(selectedOption);
        }
        const queryString = `marketType=futures&strategies=${strategies.join(',')}`;
        router.push(`/backtest?${queryString}`);
    };

    const filterOptions = useMemo(() => 
        filtersList.map(filter => (
            <S.FilterOption key={filter.key}>
                <input
                    type="checkbox"
                    checked={localFilters[filter.key]}
                    onChange={() => !filter.mandatory && handleLocalFilterChange(filter.key)}
                    disabled={filter.mandatory}
                />
                {filter.label}
            </S.FilterOption>
        )), [localFilters, handleLocalFilterChange]);

    return(
        <>
            { isMenuOpen &&
                <S.StrategyOptionDrop>
                    <S.OptionInnerContainer>
                        <S.OptionTitle> 비교: </S.OptionTitle>
                        {availableOptions.map(n => (
                            <S.ComparisonOption key={n} >
                                <input
                                    type="checkbox"
                                    checked={selectedOption === n}
                                    onChange={() => handleCheckboxChange(n)}
                                />
                                선물 {n}
                            </S.ComparisonOption>
                        ))}
                    </S.OptionInnerContainer>
                    <S.OptionHorizontalDivider/>
                    <S.OptionFilterContainer>
                        <S.OptionTitle>필터:</S.OptionTitle>
                        {filterOptions}
                    </S.OptionFilterContainer>
                    <S.OptionHorizontalDivider/>
                    <S.ButtonContainer>
                        <S.BackTestButton onClick={handleBackTestClick}>
                            <S.styledPlayIcon className='BackTestIcon'/>BackTest
                        </S.BackTestButton>
                    </S.ButtonContainer>
                </S.StrategyOptionDrop>
            }
        </>
    );
}