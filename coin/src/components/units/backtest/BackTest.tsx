import React, { useState } from 'react';
import * as S from "./BackTest.styles";
import { useSidebar } from "../../commons/sidebar/SidebarContext";
import Breadcrumb from "../../commons/breadcrumb/BreadCrumb";
import { StrategyKey } from './MockStrategy';
import OptionsContainer from './BackTestOption';
import ResultSkeletonUI from './BackTestResultSkeletonUI';
import BackTestResults from './BackTestResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

interface Trade {
    entryTime: string;
    profit: number;
}

export default function BackTestPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [selectedStrategies, setSelectedStrategies] = useState<StrategyKey[]>([]);
    const [position, setPosition] = useState<string>('long');
    const [startDate, setStartDate] = useState<string>('2023-01-01');
    const [endDate, setEndDate] = useState<string>('2024-01-01');
    const [optionsVisible, setOptionsVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [trades, setTrades] = useState<Trade[] | null>(null);
    const [marketType, setMarketType] = useState<'futures' | 'spot' | null>(null);
    const [executedOptions, setExecutedOptions] = useState<string | null>(null);

    const toggleOptions = () => setOptionsVisible(!optionsVisible);

    const handleStrategyChange = (strategy: StrategyKey) => {
        setSelectedStrategies(prev =>
            prev.includes(strategy)
                ? prev.filter(s => s !== strategy)
                : [...prev, strategy]
        );
    };

    const performBackTest = async () => {
        if (!selectedStrategies.length || !startDate || !endDate || !marketType) {
            alert("Please select market type, strategies, position, and date range.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const selectedStrategyKey = selectedStrategies[0];

            const response = await fetch('/api/backtest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ strategyKey: selectedStrategyKey, startDate, endDate, position, marketType }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTrades(data);
            
            // Set executed options
            setExecutedOptions(`${marketType} / ${selectedStrategyKey} / ${position} / 기간 ${startDate} ~ ${endDate}`);
        } catch (err) {
            setError('Failed to perform backtest');
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.Container>
            <S.BackTestHeader sidebarOpen={sidebarOpen}>
                <Breadcrumb />
            </S.BackTestHeader>
            <S.MainContent sidebarOpen={sidebarOpen}>
                <S.WidgetContainer>
                    {loading ? (
                        <ResultSkeletonUI />
                    ) : trades ? (
                        <>
                            <BackTestResults trades={trades} executedOptions={executedOptions}/>
                        </>
                    ) : null}
                    {error && <p>{error}</p>}
                    <S.OptionToggleButton onClick={toggleOptions} isVisible={optionsVisible}>
                        <FontAwesomeIcon className="FilterIcon" icon={faFilter} />
                        {optionsVisible ? '옵션 숨기기' : '옵션 보기'}
                    </S.OptionToggleButton>
                    <OptionsContainer
                        isVisible={optionsVisible}
                        selectedStrategies={selectedStrategies}
                        handleStrategyChange={handleStrategyChange}
                        position={position}
                        setPosition={setPosition}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        performBackTest={performBackTest}
                        loading={loading}
                        showToggleButton={!!trades}
                        marketType={marketType}
                        setMarketType={setMarketType}
                    />
                </S.WidgetContainer>
            </S.MainContent>
        </S.Container>
    );
}