import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as S from "./BackTest.styles";
import { useSidebar } from "../../../commons/sidebar/SidebarContext";
import Breadcrumb from "../../../commons/breadcrumb/BreadCrumb";
import OptionsContainer from '../option/BackTestOption';
import ResultSkeletonUI from '../result/BackTestResultSkeletonUI';
import BackTestResults from '../result/BackTestResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useBackTest } from '../../../../hooks/useBackTest';
import { useBackTestContext } from '../../../../contexts/BackTestContext';
import { RootState } from '../../../../store/rootReducer';
import { setBacktestResults, setExecutedOptions, clearBacktestResults } from '../../../../store/backtestResultSlice';

export default function BackTestPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const dispatch = useDispatch();
    const { results, executedOptions } = useSelector((state: RootState) => state.backtest ?? {});
    const {
        selectedStrategies,
        marketType,
        position,
        startDate,
        endDate
    } = useBackTestContext();
    const {
        backTestMutation,
        performBackTest,
    } = useBackTest();

    const [optionsVisible, setOptionsVisible] = useState(true);

    useEffect(() => {
        if (!results && !executedOptions) {
            dispatch(clearBacktestResults());
        }
    }, []);

    useEffect(() => {
        if (backTestMutation.isSuccess && backTestMutation.data) {
            dispatch(setBacktestResults(backTestMutation.data));
            const options = `${marketType} / ${selectedStrategies.join(', ')} / ${position} / 기간 ${startDate} ~ ${endDate}`;
            dispatch(setExecutedOptions(options));
        }
    }, [backTestMutation.isSuccess, backTestMutation.data, dispatch, marketType, selectedStrategies, position, startDate, endDate]);

    const handlePerformBackTest = () => {
        performBackTest();
    };

    const toggleOptions = () => {
        setOptionsVisible(!optionsVisible);
    };

    const state = useSelector((state: RootState) => state);
    console.log('Current Redux State:', state);

    return (
        <S.Container>
            <S.BackTestHeader sidebarOpen={sidebarOpen}>
                <Breadcrumb />
            </S.BackTestHeader>
            <S.MainContent sidebarOpen={sidebarOpen}>
                <S.BackTestContainer>
                    {backTestMutation.isLoading ? (
                        <ResultSkeletonUI />
                    ) : results && executedOptions ? (
                        <BackTestResults trades={results} executedOptions={executedOptions} />
                    ) : null}
                    
                    <S.OptionToggleButton onClick={toggleOptions} isVisible={optionsVisible}>
                        <FontAwesomeIcon className="FilterIcon" icon={faFilter} />
                        {optionsVisible ? '옵션 숨기기' : '옵션 보기'}
                    </S.OptionToggleButton>
                    
                    <OptionsContainer
                        isVisible={optionsVisible}
                        loading={backTestMutation.isLoading}
                        showToggleButton={true}
                        performBackTest={handlePerformBackTest}
                    />
                    
                    {backTestMutation.isError && <p>{(backTestMutation.error as Error).message}</p>}
                </S.BackTestContainer>
            </S.MainContent>
        </S.Container>
    );
}