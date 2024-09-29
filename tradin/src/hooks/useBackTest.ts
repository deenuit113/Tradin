import { useState } from 'react';
import { useMutation } from 'react-query';
import { useBackTestContext } from '../contexts/BackTestContext';
import { fetchBackTestResults } from '../../app/api/backtest/fetchBackTestResult';
import { Trade } from '../components/units/backtest/main/BackTest.types';

export const useBackTest = () => {
    const {
        selectedStrategies,
        position,
        startDate,
        endDate,
        marketType,
        setMarketType,
        setSelectedStrategies,
        setPosition,
        isInitialRender,
    } = useBackTestContext();

    const [optionsVisible, setOptionsVisible] = useState(true);
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
        if (!isInitialRender) {
            setSelectedStrategies([]);
            setPosition('long');
        }
    };

    const performBackTest = () => {
        if (!selectedStrategies.length || !startDate || !endDate || !marketType) {
            alert("옵션을 선택해주세요.");
            return;
        }
        backTestMutation.mutate({ strategies: selectedStrategies, startDate, endDate, position, marketType });
    };

    return {
        optionsVisible,
        executedOptions,
        showToggleButton,
        trades,
        backTestMutation,
        toggleOptions,
        handleMarketTypeChange,
        performBackTest,
    };
};