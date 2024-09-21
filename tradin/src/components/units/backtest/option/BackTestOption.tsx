import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as S from '../main/BackTest.styles';
import { StrategyKey, strategies } from '../mockdata/MockStrategy';

const StyledDatePickerWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 5px;

    .react-datepicker-wrapper {
        width: 100%;
    }

    .react-datepicker-popper {
        width: 100%;
        position: relative !important;
        top: 100% !important;
        left: 0 !important;
        transform: none !important;
    }

    .react-datepicker {
        width: 100%;
        font-size: 1em;
        background-color: ${({ theme }) => theme.backgroundColor};
        color: ${({ theme }) => theme.textColor};
        border: 1px solid ${({ theme }) => theme.borderColor};
        border-top: none;
        border-radius: 0px 0px 4px 4px;
    }

    .react-datepicker__triangle {
        display: none;
    }

    .react-datepicker__month-container {
        width: 100%;
        border-radius: 0px 0px 4px 4px;
    }

    .react-datepicker__month {
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        gap: 3px;
        height: 240px;
    }

    .react-datepicker__week {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2%;
    }

    .react-datepicker__header {
        background-color: ${({ theme }) => theme.backgroundColor};
        border-bottom: 1px solid ${({ theme }) => theme.borderColor};
        padding-top: 10px;
    }

    .react-datepicker__current-month {
        margin-bottom: 10px;
    }

    .react-datepicker__current-month,
    .react-datepicker__day-name,
    .react-datepicker__day {
        color: ${({ theme }) => theme.textColor};
    }

    .react-datepicker__day:hover {
        background-color: ${({ theme }) => theme.hoverColor};
    }

    .react-datepicker__day--selected {
        background-color: ${({ theme }) => theme.highlightColor};
        color: ${({ theme }) => theme.backgroundColor};
    }

    .react-datepicker__day,
    .react-datepicker__day-name {
        width: 12%;
        height: 40px;
        line-height: 40px;
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 0.8em;
    }

    .react-datepicker__day--outside-month {
        visibility: hidden;
    }

    .react-datepicker__day-names {
        display: flex;
        justify-content: space-between;
        padding: 0 2%;
    }

    @media (max-width: 600px) {
        .react-datepicker-popper {
            display: none;
        }
    }

    @media (max-width: 799px) {
        .react-datepicker__month {
            height: 150px;
        }

        .react-datepicker__day,
        .react-datepicker__day-name {
            height: 25px;
            line-height: 25px;
        }
    }
`;

const OptionsLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5%;
    padding: 1rem;
`;

const OptionGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

const OptionTitle = styled(S.OptionTitle)`
    margin-bottom: 2%;
    font-size: 1.2em;
`;

const OptionContent = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-left: 5%;
`;

const OptionButton = styled.button<{ isSelected: boolean }>`
    padding: 10px 15px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 20px;
    background-color: ${({ isSelected, theme }) => (isSelected ? theme.OptionHighlightColor : theme.backgroundColor)};
    color: ${({ isSelected, theme }) => (isSelected ? theme.backgroundColor : theme.textColor)};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.hoverColor};
    }
`;

const DatePickerOptionContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const DatePickersRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

const DatePickerInput = styled.input`
    text-align: center;
    width: 100%;
    padding: 2%;
    border: 1px solid ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.backTestInputBackgroundColor};
    color: ${({ theme }) => theme.textColor};
    border-radius: 4px 4px 0px 0px;
    font-size: 1em;
`;

const DateRangeSeparator = styled.span`
    font-size: 1.5em;
    color: ${({ theme }) => theme.textColor};
    margin: 0 10px;
    display: flex;
    align-items: center;
`;

const DatePickerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const DatePickerLabelInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const HorizontalDivider = styled.div`
    width: 100%;
    height: 1px;
    border: 1px solid ${({ theme }) => theme.moreinnerbackgroundColor};
    margin-bottom: 1rem;
`;

const DateRangeSelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const DateOptionTitle = styled.h4`
    font-size: 1.2em;
    color: ${({ theme }) => theme.textColor};
`;

const DateRangeSelect = styled.select`
    width: 20%;
    padding: 4px 8px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.backTestInputBackgroundColor};
    color: ${({ theme }) => theme.textColor};
    border-radius: 4px;
    font-size: 0.8em;
    margin-top: 2rem;
    cursor: pointer;

    @media (max-width: 799px) {
        width: 30%;
    }
`;

interface OptionsContainerProps {
    isVisible: boolean;
    selectedStrategies: StrategyKey[];
    handleStrategyChange: (strategy: StrategyKey) => void;
    position: string;
    setPosition: (position: 'long' | 'short') => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    performBackTest: () => void;
    loading: boolean;
    showToggleButton: boolean;
    marketType: '선물' | '현물' | null;
    setMarketType: (type: '선물' | '현물' | null) => void;
    setSelectedStrategies: React.Dispatch<React.SetStateAction<StrategyKey[]>>;
    initialStrategies: StrategyKey[];
}

const OptionsContainer: React.FC<OptionsContainerProps> = ({
    isVisible,
    selectedStrategies,
    handleStrategyChange,
    position,
    setPosition,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    performBackTest,
    loading,
    showToggleButton,
    marketType,
    setMarketType,
    setSelectedStrategies,
    initialStrategies,
}) => {
    const [dateRange, setDateRange] = useState('1개월');
    const [isInitialRender, setIsInitialRender] = useState(true);

    useEffect(() => {
        if (initialStrategies.length > 0) {
            setSelectedStrategies(initialStrategies);
            setIsInitialRender(false);
        }
    }, []);

    useEffect(() => {
        if (!isInitialRender) {
            setSelectedStrategies([]);
            setPosition('long');
        }
    }, [marketType]);

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

    return (
        <S.OptionsContainer isVisible={isVisible} showToggleButton={showToggleButton}>
            <S.ButtonContainer>
                <S.BackTestButton onClick={performBackTest} disabled={loading}>
                    <S.StyledRocketIcon className="RocketIcon" />BackTest Run
                </S.BackTestButton>
            </S.ButtonContainer>
            <OptionsLayout>
                <OptionGroup>
                    <OptionTitle>유형</OptionTitle>
                    <HorizontalDivider/>
                    <OptionContent>
                        <OptionButton
                            isSelected={marketType === '선물'}
                            onClick={() => setMarketType('선물')}
                        >
                            선물
                        </OptionButton>
                        <OptionButton
                            isSelected={marketType === '현물'}
                            onClick={() => setMarketType('현물')}
                        >
                            현물
                        </OptionButton>
                    </OptionContent>
                </OptionGroup>

                {marketType && (
                    <OptionGroup>
                        <OptionTitle>전략</OptionTitle>
                        <HorizontalDivider/>
                        <OptionContent>
                            {Object.entries(strategies)
                                .filter(([_, strategy]) => strategy.type === marketType)
                                .map(([key, _]) => (
                                    <OptionButton
                                        key={key}
                                        isSelected={selectedStrategies.includes(key as StrategyKey)}
                                        onClick={() => handleStrategyChange(key as StrategyKey)}
                                    >
                                        {marketType === '선물' ? '선물' : '현물'} 전략 {key.slice(1)}
                                    </OptionButton>
                                ))}
                        </OptionContent>
                    </OptionGroup>
                )}
                
                {marketType && (
                    <OptionGroup>
                        <OptionTitle>포지션</OptionTitle>
                        <HorizontalDivider/>
                        <OptionContent>
                            <OptionButton
                                isSelected={position === 'long'}
                                onClick={() => setPosition('long')}
                            >
                                Long
                            </OptionButton>
                            <OptionButton
                                isSelected={position === 'short'}
                                onClick={() => setPosition('short')}
                                disabled={marketType === '현물'}
                            >
                                Short
                            </OptionButton>
                        </OptionContent>
                    </OptionGroup>
                )}

                <OptionGroup>
                    <DateRangeSelectContainer>
                        <DateOptionTitle>기간 선택</DateOptionTitle>
                        <DateRangeSelect value={dateRange} onChange={handleDateRangeChange}>
                            <option value="1개월">최근 1개월</option>
                            <option value="3개월">최근 3개월</option>
                            <option value="6개월">최근 6개월</option>
                            <option value="1년">최근 1년</option>
                            <option value="3년">최근 3년</option>
                            <option value="5년">최근 5년</option>
                            <option value="사용자 지정">사용자 지정</option>
                        </DateRangeSelect>
                    </DateRangeSelectContainer>
                    <HorizontalDivider/>
                    <DatePickerOptionContent>
                        <DatePickersRow>
                            <DatePickerContainer>
                                <DatePickerLabelInputContainer>
                                    <StyledDatePickerWrapper>
                                        <DatePicker
                                            selected={startDate ? new Date(startDate) : null}
                                            onChange={(date: Date | null) => {
                                                setStartDate(date ? date.toISOString().split('T')[0] : '');
                                                setDateRange('사용자 지정');
                                            }}
                                            dateFormat="yyyy-MM-dd"
                                            customInput={<DatePickerInput />}
                                            openToDate={startDate ? new Date(startDate) : undefined}
                                            open={true}
                                        />
                                    </StyledDatePickerWrapper>
                                </DatePickerLabelInputContainer>
                            </DatePickerContainer>
                            <DateRangeSeparator>~</DateRangeSeparator>
                            <DatePickerContainer>
                                <DatePickerLabelInputContainer>
                                    <StyledDatePickerWrapper>
                                        <DatePicker
                                            selected={endDate ? new Date(endDate) : null}
                                            onChange={(date: Date | null) => {
                                                setEndDate(date ? date.toISOString().split('T')[0] : '');
                                            }}
                                            dateFormat="yyyy-MM-dd"
                                            customInput={<DatePickerInput />}
                                            open={true}
                                        />
                                    </StyledDatePickerWrapper>
                                </DatePickerLabelInputContainer>
                            </DatePickerContainer>
                        </DatePickersRow>
                    </DatePickerOptionContent>
                </OptionGroup>
            </OptionsLayout>
        </S.OptionsContainer>
    );
};

export default OptionsContainer;