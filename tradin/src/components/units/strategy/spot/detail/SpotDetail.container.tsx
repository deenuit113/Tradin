import { useSearchParams, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CoinData } from './SpotDetail.types';
import SpotDetailUI from './SpotDetail.presenter';

const initialFilters = {
    coin: true,
    position: true,
    entryPrice: true,
    profitLoss: false,
    winRate: false,
    profitFactor: false,
    trades: false,
    averageBars: false,
    averageProfit: false
};

const coinData: CoinData[] = [
    { position: '상승', entryPrice: '1000 KRW', profitLoss: '10.00%', winRate: '50.00%', profitFactor: '1.234', trades: 5, averageBars: 10, averageProfit: '5.00%' },
];

export default function SpotDetail(): JSX.Element {
    const { num } = useParams();
    const searchParams = useSearchParams();
    const currentStrategy = Number(searchParams.get('currentStrategy')) || Number(num);
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const [filters, setFilters] = useState<{ [key: string]: boolean }>(initialFilters);

    const [selectedOption, setSelectedOption] = useState<number | null>(null);



    const handleCheckboxChange = (option: number) => {
        setSelectedOption(selectedOption === option ? null : option);
    };

    const handleFilterChange = (key: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: !prevFilters[key]
        }));
    };

    const availableOptions = [1, 2, 3].filter(n => n !== Number(num));
    
    useEffect(() => {
        setSelectedOption(null);
    }, [num]);

    const onClickStrategyOption = () => {
        setMenuOpen(prev=> !prev);
    }

    return (
        <>
            <SpotDetailUI
                filters={filters}
                onClickStrategyOption={onClickStrategyOption}
                isMenuOpen={isMenuOpen}
                availableOptions={availableOptions}
                selectedOption={selectedOption}
                handleCheckboxChange={handleCheckboxChange}
                handleFilterChange={handleFilterChange}
                currentStrategy={currentStrategy}
                num={num}
                coinData={coinData}
            />
        </>
    );
}