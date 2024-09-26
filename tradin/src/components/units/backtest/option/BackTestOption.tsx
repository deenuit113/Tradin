import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as S from './BackTestOption.styles';
import { StrategyKey, strategies } from '../mockdata/MockStrategy';
import { OptionsContainerProps } from './BackTestOption.types';
import { validateAllOptions } from '../utils/validateOptions';
import { useBackTestOptionError } from '../../../../hooks/useBackTestOptionError';
import { useBackTestContext } from '../../../../contexts/BackTestContext';

const OptionsContainer: React.FC<OptionsContainerProps> = ({
    isVisible,
    loading,
    showToggleButton,
    performBackTest,
}) => {
    const {
        selectedStrategies,
        setSelectedStrategies,
        position,
        setPosition,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        marketType,
        setMarketType,
    } = useBackTestContext();

    const [dateRange, setDateRange] = useState('1년');
    const { errors, setError, resetErrors } = useBackTestOptionError();
    const [errorScroll, setErrorScroll] = useState(false);

    useEffect(() => {
        if (errorScroll) {
            const errorElements = document.querySelectorAll('.error');
            if (errorElements.length > 0) {
                errorElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setErrorScroll(false);
        }
    }, [errorScroll, errors]);

    const handleStrategyChange = (strategy: StrategyKey) => {
        setSelectedStrategies(prev =>
            prev.includes(strategy)
                ? prev.filter(s => s !== strategy)
                : [...prev, strategy]
        );
    };

    const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRange = e.target.value;
        setDateRange(selectedRange);

        const endDate = new Date();
        let startDate = new Date();

        switch (selectedRange) {
            case '1개월':
                startDate.setMonth(endDate.getMonth() - 1);
                break;
            case '3개월':
                startDate.setMonth(endDate.getMonth() - 3);
                break;
            case '6개월':
                startDate.setMonth(endDate.getMonth() - 6);
                break;
            case '1년':
                startDate.setFullYear(endDate.getFullYear() - 1);
                break;
            case '3년':
                startDate.setFullYear(endDate.getFullYear() - 3);
                break;
            case '5년':
                startDate.setFullYear(endDate.getFullYear() - 5);
                break;
            default:
                return;
        }

        setStartDate(startDate.toISOString().split('T')[0]);
        setEndDate(endDate.toISOString().split('T')[0]);
    };

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            const newStartDate = date.toISOString().split('T')[0];
            setStartDate(newStartDate);
            setDateRange('사용자 지정');
        } else {
            setStartDate('');
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            const newEndDate = date.toISOString().split('T')[0];
            setEndDate(newEndDate);
        } else {
            setEndDate('');
        }
    };

    const handlePerformBackTest = () => {
        const { isValid, typeError, strategyError, positionError, dateError } = validateAllOptions(
            marketType,
            selectedStrategies,
            position,
            startDate,
            endDate
        );

        resetErrors();
        setError('typeError', typeError);
        setError('strategyError', strategyError);
        setError('positionError', positionError);
        setError('dateError', dateError);

        if (isValid) {
            performBackTest();
        } else {
            setErrorScroll(true);
        }
    };

    return (
        <S.OptionsContainer isVisible={isVisible} showToggleButton={showToggleButton}>
            <S.RunButtonContainer>
                <S.BackTestButton onClick={handlePerformBackTest} disabled={loading}>
                    <S.StyledRocketIcon className="RocketIcon" />BackTest Run
                </S.BackTestButton>
            </S.RunButtonContainer>
            <S.OptionsLayout>
                <S.OptionGroup className={errors.typeError ? 'error' : ''}>
                    <S.OptionHeaderContainer>
                        <S.OptionHeaderInnerContainer>
                            <S.OptionTitle>유형</S.OptionTitle>
                            {errors.typeError && <S.ErrorMessage>유형을 다시 설정해주세요.</S.ErrorMessage>}
                        </S.OptionHeaderInnerContainer>
                    </S.OptionHeaderContainer>
                    <S.HorizontalDivider/>
                    <S.OptionContent>
                        <S.OptionButton
                            isSelected={marketType === '선물'}
                            onClick={() => setMarketType('선물')}
                            hasError={errors.typeError}
                        >
                            선물
                        </S.OptionButton>
                        <S.OptionButton
                            isSelected={marketType === '현물'}
                            onClick={() => setMarketType('현물')}
                            hasError={errors.typeError}
                        >
                            현물
                        </S.OptionButton>
                    </S.OptionContent>
                </S.OptionGroup>

                {marketType && (
                    <S.OptionGroup className={errors.strategyError ? 'error' : ''}>
                        <S.OptionHeaderContainer>
                            <S.OptionHeaderInnerContainer>
                                <S.OptionTitle>전략</S.OptionTitle>
                                {errors.strategyError && <S.ErrorMessage>전략을 다시 설정해주세요.</S.ErrorMessage>}
                            </S.OptionHeaderInnerContainer>
                        </S.OptionHeaderContainer>
                        <S.HorizontalDivider/>
                        <S.OptionContent>
                            {Object.entries(strategies)
                                .filter(([_, strategy]) => strategy.type === marketType)
                                .map(([key, _]) => (
                                    <S.OptionButton
                                        key={key}
                                        isSelected={selectedStrategies.includes(key as StrategyKey)}
                                        onClick={() => handleStrategyChange(key as StrategyKey)}
                                        hasError={errors.strategyError}
                                    >
                                        {marketType === '선물' ? '선물' : '현물'} 전략 {key.slice(1)}
                                    </S.OptionButton>
                                ))}
                        </S.OptionContent>
                    </S.OptionGroup>
                )}
                
                {marketType && (
                    <S.OptionGroup className={errors.positionError ? 'error' : ''}>
                        <S.OptionHeaderContainer>
                            <S.OptionHeaderInnerContainer>
                                <S.OptionTitle>포지션</S.OptionTitle>
                                {errors.positionError && <S.ErrorMessage>포지션을 다시 설정해주세요.</S.ErrorMessage>}
                            </S.OptionHeaderInnerContainer>
                        </S.OptionHeaderContainer>
                        <S.HorizontalDivider/>
                        <S.OptionContent>
                            <S.OptionButton
                                isSelected={position === 'long'}
                                onClick={() => setPosition('long')}
                                hasError={errors.positionError}
                            >
                                Long
                            </S.OptionButton>
                            <S.OptionButton
                                isSelected={position === 'short'}
                                onClick={() => setPosition('short')}
                                disabled={marketType === '현물'}
                                hasError={errors.positionError}
                            >
                                Short
                            </S.OptionButton>
                        </S.OptionContent>
                    </S.OptionGroup>
                )}

                <S.OptionGroup className={errors.dateError ? 'error' : ''}>
                    <S.OptionHeaderContainer>
                        <S.OptionHeaderInnerContainer>
                            <S.OptionTitle>기간 선택</S.OptionTitle>
                            {errors.dateError && <S.ErrorMessage>기간을 다시 설정해주세요.</S.ErrorMessage>}
                        </S.OptionHeaderInnerContainer>
                        <S.DateRangeSelect value={dateRange} onChange={handleDateRangeChange}>
                            <option value="1개월">최근 1개월</option>
                            <option value="3개월">최근 3개월</option>
                            <option value="6개월">최근 6개월</option>
                            <option value="1년">최근 1년</option>
                            <option value="3년">최근 3년</option>
                            <option value="5년">최근 5년</option>
                            <option value="사용자 지정">사용자 지정</option>
                        </S.DateRangeSelect>
                    </S.OptionHeaderContainer>
                    <S.HorizontalDivider/>
                    <S.DatePickerOptionContent>
                        <S.DatePickersRow>
                            <S.DatePickerContainer hasError={errors.dateError}>
                                <S.DatePickerLabelInputContainer>
                                    <S.StyledDatePickerWrapper>
                                        <DatePicker
                                            selected={startDate ? new Date(startDate) : null}
                                            onChange={handleStartDateChange}
                                            dateFormat="yyyy-MM-dd"
                                            customInput={<S.DatePickerInput />}
                                            openToDate={startDate ? new Date(startDate) : undefined}
                                            open={true}
                                        />
                                    </S.StyledDatePickerWrapper>
                                </S.DatePickerLabelInputContainer>
                            </S.DatePickerContainer>
                            <S.DateRangeSeparator>~</S.DateRangeSeparator>
                            <S.DatePickerContainer hasError={errors.dateError}>
                                <S.DatePickerLabelInputContainer>
                                    <S.StyledDatePickerWrapper>
                                        <DatePicker
                                            selected={endDate ? new Date(endDate) : null}
                                            onChange={handleEndDateChange}
                                            dateFormat="yyyy-MM-dd"
                                            customInput={<S.DatePickerInput />}
                                            open={true}
                                        />
                                    </S.StyledDatePickerWrapper>
                                </S.DatePickerLabelInputContainer>
                            </S.DatePickerContainer>
                        </S.DatePickersRow>
                    </S.DatePickerOptionContent>
                </S.OptionGroup>
            </S.OptionsLayout>
        </S.OptionsContainer>
    );
};

export default OptionsContainer;