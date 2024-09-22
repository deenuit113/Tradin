import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useSearchParams } from 'next/navigation';
import { StrategyKey } from '../components/units/backtest/mockdata/MockStrategy';
import { fetchBackTestResults } from '../../app/api/backtest/fetchBackTestResult';
import { Trade } from '../components/units/backtest/main/BackTest.types';

export const useBackTest = () => {
    const searchParams = useSearchParams();
    const initialMarketType = searchParams.get('marketType') === 'spot' ? '현물' : 
                              searchParams.get('marketType') === 'futures' ? '선물' : null;
    const initialStrategies = searchParams.get('strategies')?.split(',').map(num => {
        const prefix = initialMarketType === '현물' ? 'S' : 'F';
        return `${prefix}${num}` as StrategyKey;
    }).filter(Boolean) || [];

    const [selectedStrategies, setSelectedStrategies] = useState<StrategyKey[]>(initialStrategies);
    const [position, setPosition] = useState<string>('long');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [optionsVisible, setOptionsVisible] = useState(true);
    const [marketType, setMarketType] = useState<'선물' | '현물' | null>(initialMarketType);
    const [executedOptions, setExecutedOptions] = useState<string | null>(null);
    const [showToggleButton, setShowToggleButton] = useState(false);
    const [trades, setTrades] = useState<{ [key: string]: Trade[] } | null>(null);

    const toggleOptions = () => setOptionsVisible(!optionsVisible);

    const backTestMutation = useMutation(fetchBackTestResults, {
        onSuccess: (data) => {
            setTrades(data);
            setShowToggleButton(true);
            setExecutedOptions(`${marketType} / ${selectedStrategies.join(', ')} / ${position} / 기간 ${startDate} ~ ${endDate}`);
        },
        onError: (error) => {
            console.error('Backtest error:', error);
        },
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * (2 ** attemptIndex), 30000),
    });

    const handleMarketTypeChange = (newMarketType: '선물' | '현물' | null) => {
        setMarketType(newMarketType);
        setSelectedStrategies([]);
        setPosition('long');
    };

    const handleStrategyChange = (strategy: StrategyKey) => {
        setSelectedStrategies(prev =>
            prev.includes(strategy)
                ? prev.filter(s => s !== strategy)
                : [...prev, strategy]
        );
    };

    useEffect(() => {
        const end = new Date();
        const start = new Date();
        start.setFullYear(start.getFullYear() - 1);
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
    }, []);

    const performBackTest = () => {
        if (!selectedStrategies.length || !startDate || !endDate || !marketType) {
            alert("옵션을 선택해주세요.");
            return;
        }
        backTestMutation.mutate({ strategies: selectedStrategies, startDate, endDate, position, marketType });
    };

    return {
        selectedStrategies,
        position,
        startDate,
        endDate,
        optionsVisible,
        marketType,
        executedOptions,
        showToggleButton,
        trades,
        backTestMutation,
        toggleOptions,
        handleMarketTypeChange,
        handleStrategyChange,
        setPosition,
        setStartDate,
        setEndDate,
        performBackTest,
        setSelectedStrategies,
        initialStrategies
    };
};