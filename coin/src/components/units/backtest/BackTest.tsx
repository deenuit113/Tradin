'use client'

import React, { useEffect, useState } from 'react';
import * as S from "./BackTest.styles";
import { useSidebar } from "../../commons/sidebar/SidebarContext";
import Breadcrumb from "../../commons/breadcrumb/BreadCrumb";
import { StrategyKey } from './MockStrategy';
import OptionsContainer from './BackTestOption';
import ResultSkeletonUI from './BackTestResultSkeletonUI';
import BackTestResults from './BackTestResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'next/navigation';

interface Trade {
    entryTime: string;
    exitTime: string;
    profit: number;
    strategy: string;
}

export default function BackTestPage(): JSX.Element {
    const searchParams = useSearchParams();
    const { sidebarOpen } = useSidebar();

    const [initializedState, setInitializedState] = useState(false);
    const [selectedStrategies, setSelectedStrategies] = useState<StrategyKey[]>([]);
    const [position, setPosition] = useState<string>('long');
    const [startDate, setStartDate] = useState<string>('2023-01-01');
    const [endDate, setEndDate] = useState<string>('2024-01-01');
    const [optionsVisible, setOptionsVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [trades, setTrades] = useState<{ [key: string]: Trade[] } | null>(null);
    const [marketType, setMarketType] = useState<'선물' | '현물' | null>(null);
    const [executedOptions, setExecutedOptions] = useState<string | null>(null);

    const toggleOptions = () => setOptionsVisible(!optionsVisible);

    useEffect(() => {
        if (!initializedState) {
            const initialMarketType = searchParams.get('marketType') === 'spot' ? '현물' : 
                                      searchParams.get('marketType') === 'futures' ? '선물' : null;
            const initialStrategies = searchParams.get('strategies')?.split(',').map(num => {
                const prefix = initialMarketType === '현물' ? 'S' : 'F';
                return `${prefix}${num}` as StrategyKey;
            }).filter(Boolean) || [];

            setSelectedStrategies(initialStrategies);
            setMarketType(initialMarketType);
            setInitializedState(true);
        }
    }, [searchParams, initializedState]);

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
            const response = await fetch('/api/backtest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    strategies: selectedStrategies, 
                    startDate, 
                    endDate, 
                    position, 
                    marketType 
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // 데이터 변환이 필요 없어졌습니다. API에서 이미 올바른 형식으로 반환합니다.
            setTrades(data);
            
            // Set executed options
            setExecutedOptions(`${marketType} / ${selectedStrategies.join(', ')} / ${position} / 기간 ${startDate} ~ ${endDate}`);
        } catch (err) {
            console.error('Backtest error:', err);
            setError('Failed to perform backtest');
        } finally {
            setLoading(false);
        }
    };

    if (!initializedState) {
        return <div>Loading...</div>; // 또는 다른 로딩 표시
    }

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
                        <BackTestResults trades={trades} executedOptions={executedOptions} />
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