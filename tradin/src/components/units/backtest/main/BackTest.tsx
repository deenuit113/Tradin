import React from 'react';
import * as S from "./BackTest.styles";
import { useSidebar } from "../../../commons/sidebar/SidebarContext";
import Breadcrumb from "../../../commons/breadcrumb/BreadCrumb";
import OptionsContainer from '../option/BackTestOption';
import ResultSkeletonUI from '../result/BackTestResultSkeletonUI';
import BackTestResults from '../result/BackTestResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useBackTest } from '../../../../hooks/useBackTest';

export default function BackTestPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const {
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
    } = useBackTest();

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