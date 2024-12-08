import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as C from "./styles/BackTest.components";
import { useSidebar } from "../../../../contexts/SidebarContext";
import Breadcrumb from "../../../commons/breadcrumb/BreadCrumb.container";
import OptionsContainer from '../option/BackTestOption';
import ResultSkeletonUI from '../result/ResultSkeletonUI';
import BackTestResults from '../result/BackTestResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useBackTest } from '../../../../hooks/useBackTest';
import { useBackTestContext } from '../../../../contexts/BackTestContext';
import { RootState } from '../../../../store/rootReducer';
import { setBacktestResults, setExecutedOptions, clearBacktestResults } from '../../../../store/backtestResultSlice';
import { Button, Collapsible } from '@chakra-ui/react';

export default function BackTestPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const dispatch = useDispatch();

    // 필요한 상태 조각만 선택
    const results = useSelector((state: RootState) => state.backtest.results);
    const executedOptions = useSelector((state: RootState) => state.backtest.executedOptions);

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
        showToggleButton,
    } = useBackTest();

    const [optionsVisible, setOptionsVisible] = useState(true);

    useEffect(() => {
        if (!results && !executedOptions) {
            dispatch(clearBacktestResults());
        }
    }, [dispatch, results, executedOptions]);

    useEffect(() => {
        if (backTestMutation.isSuccess && backTestMutation.data) {
            dispatch(setBacktestResults(backTestMutation.data));
            const options = `${marketType} / ${selectedStrategies.join(', ')} / ${position} / 기간 ${startDate} ~ ${endDate}`;
            dispatch(setExecutedOptions(options));
        }
    }, [backTestMutation.isSuccess, backTestMutation.data, dispatch, marketType, selectedStrategies, position, startDate, endDate]);

    const toggleOptions = () => {
        setOptionsVisible(!optionsVisible);
    };

    return (
        <C.Container sidebarOpen={sidebarOpen}>
            <Breadcrumb />
            <C.BackTestContainer>
                {backTestMutation.isLoading ? (
                    <ResultSkeletonUI />
                ) : results && executedOptions ? (
                    <BackTestResults trades={results} executedOptions={executedOptions} />
                ) : null}
                
                <Collapsible.Root 
                    open={optionsVisible} 
                    width={{base: "50%", lg: "50%", sm: "100%"}}
                >
                    {showToggleButton ? (
                        <Collapsible.Trigger
                            width="100%"
                            onClick={toggleOptions}
                        >
                            <Button
                                width="100%"
                                display="flex"
                                flexDirection="row"
                                justifyContent="center"
                                alignItems="center"
                                color="textColor"
                                bg="backgroundColor"
                                borderColor="borderGrayColor"
                                borderRadius={optionsVisible ? "6px 6px 0px 0px" : "6px 6px 6px 6px"}
                            >
                                <FontAwesomeIcon icon={faFilter} />
                                {optionsVisible ? '옵션 숨기기' : '옵션 보기'}
                            </Button>
                            
                        </Collapsible.Trigger>)
                        : 
                        (<></>)
                    }
                    <Collapsible.Content marginBottom="20px">
                        <OptionsContainer
                            isVisible={optionsVisible}
                            loading={backTestMutation.isLoading}
                            showToggleButton={showToggleButton}
                            performBackTest={performBackTest}
                        />
                    </Collapsible.Content>
                </Collapsible.Root>
                
                {backTestMutation.isError && <p>{(backTestMutation.error as Error).message}</p>}
            </C.BackTestContainer>
        </C.Container>
    );
}