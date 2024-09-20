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
    const initialMarketType = searchParams.get('marketType') === 'spot' ? '현물' : 
                              searchParams.get('marketType') === 'futures' ? '선물' : null;
    const initialStrategies = searchParams.get('strategies')?.split(',').map(num => {
        const prefix = initialMarketType === '현물' ? 'S' : 'F';
        return `${prefix}${num}` as StrategyKey;
    }).filter(Boolean) || [];
    const { sidebarOpen } = useSidebar();
    const [selectedStrategies, setSelectedStrategies] = useState<StrategyKey[]>(initialStrategies);
    const [position, setPosition] = useState<string>('long');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [optionsVisible, setOptionsVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [trades, setTrades] = useState<{ [key: string]: Trade[] } | null>(null);
    const [marketType, setMarketType] = useState<'선물' | '현물' | null>(initialMarketType);
    const [executedOptions, setExecutedOptions] = useState<string | null>(null);
    const [showToggleButton, setShowToggleButton] = useState(false);
    const [isOptionHidden, setOptionIsHidden] = useState(!optionsVisible);

    const toggleOptions = () => setOptionsVisible(!optionsVisible);

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
        let timeoutId: NodeJS.Timeout;
        if (!optionsVisible) {
            timeoutId = setTimeout(() => setOptionIsHidden(true), 300); // 애니메이션 지속 시간과 일치
        } else {
            setOptionIsHidden(false);
        }
        return () => clearTimeout(timeoutId);
    }, [optionsVisible]);

    useEffect(() => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 1);
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
    }, []);

    const performBackTest = async () => {
        if (!selectedStrategies.length || !startDate || !endDate || !marketType) {
            alert("옵션을 선택해주세요.");
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
            
            setTrades(data);
            setShowToggleButton(true);
            
            setExecutedOptions(`${marketType} / ${selectedStrategies.join(', ')} / ${position} / 기간 ${startDate} ~ ${endDate}`);
        } catch (err) {
            console.error('Backtest error:', err);
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
                <S.BackTestContainer>
                    {loading ? (
                        <ResultSkeletonUI />
                    ) : trades ? (
                        <BackTestResults trades={trades} executedOptions={executedOptions} />
                    ) : null}
                    {error && <p>{error}</p>}
                    {showToggleButton && (
                        <S.OptionToggleButton onClick={toggleOptions} isVisible={optionsVisible}>
                            <FontAwesomeIcon className="FilterIcon" icon={faFilter} />
                            {optionsVisible ? '옵션 숨기기' : '옵션 보기'}
                        </S.OptionToggleButton>
                    )}
                    <OptionsContainer
                        isVisible={optionsVisible}
                        aria-hidden={isOptionHidden}
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
                        showToggleButton={showToggleButton}
                        marketType={marketType}
                        setMarketType={handleMarketTypeChange}
                        setSelectedStrategies={setSelectedStrategies}
                        initialStrategies={initialStrategies}
                    />
                </S.BackTestContainer>
            </S.MainContent>
        </S.Container>
    );
}