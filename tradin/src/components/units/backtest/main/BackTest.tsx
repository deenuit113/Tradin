import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import * as S from "./BackTest.styles";
import { useSidebar } from "../../../commons/sidebar/SidebarContext";
import Breadcrumb from "../../../commons/breadcrumb/BreadCrumb";
import { StrategyKey } from '../mockdata/MockStrategy';
import OptionsContainer from '../option/BackTestOption';
import ResultSkeletonUI from '../result/BackTestResultSkeletonUI';
import BackTestResults from '../result/BackTestResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'next/navigation';

interface Trade {
    entryTime: string;
    exitTime: string;
    profit: number;
    strategy: string;
}

const fetchBackTestResults = async (params: any) => {
    const response = await fetch('/api/backtest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

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
        // 지수 백오프
        /*
            네트워크 문제나 서버 부하로 인한 일시적인 오류를 효과적으로 처리할 수 있음.
            연속적인 재시도로 인한 서버 부하를 줄일 수 있음.
            시간이 지남에 따라 재시도 간격을 늘려 시스템 리소스를 효율적으로 사용.
        */
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
        start.setMonth(start.getMonth() - 1);
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

    return (
        <S.Container>
            <S.BackTestHeader sidebarOpen={sidebarOpen}>
                <Breadcrumb />
            </S.BackTestHeader>
            <S.MainContent sidebarOpen={sidebarOpen}>
                <S.BackTestContainer>
                    {backTestMutation.isLoading ? (
                        <ResultSkeletonUI />
                    ) : trades ? (
                        <BackTestResults trades={trades} executedOptions={executedOptions} />
                    ) : null}
                    {backTestMutation.isError && <p>{(backTestMutation.error as Error).message}</p>}
                    {showToggleButton && (
                        <S.OptionToggleButton onClick={toggleOptions} isVisible={optionsVisible}>
                            <FontAwesomeIcon className="FilterIcon" icon={faFilter} />
                            {optionsVisible ? '옵션 숨기기' : '옵션 보기'}
                        </S.OptionToggleButton>
                    )}
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
                        loading={backTestMutation.isLoading}
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