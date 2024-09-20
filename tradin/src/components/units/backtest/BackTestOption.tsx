import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as S from './BackTest.styles';
import { StrategyKey, strategies } from './MockStrategy';

const StyledDatePickerWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 5px;

    .react-datepicker-wrapper {
        width: 100%;
    }

    .react-datepicker-popper {
        width: 100%;
        height: 80%;
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
        height: 100%;
    }

    .react-datepicker__header {
        background-color: ${({ theme }) => theme.backgroundColor};
        border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    }

    .react-datepicker__current-month,
    .react-datepicker__navigation {
        margin-top: 10px;
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

    .react-datepicker__day {
        padding: 0.25rem 0;
        text-align: center;
        align-items: center;
        font-size: 0.8em;
        width: 12%;
    }

    .react-datepicker__day-name {
        padding: 0.25rem 0;
        font-size: 0.8em;
        width: 12%;
    }

    .react-datepicker__day-names {
        padding: 0px 5px;
    }

    @media (max-width: 600px) {
        .react-datepicker-popper {
            display: none;
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
    background-color: ${({ isSelected, theme }) => (isSelected ? theme.highlightColor : theme.backgroundColor)};
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

const DatePickerLabel = styled.span`
    width: 100%;
    text-align: center;
    margin-right: 5%;
    margin-bottom: 5px;
    font-weight: 700;
    color: ${({ theme }) => theme.textColor};
`;

const HorizontalDivider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    margin-bottom: 1rem;
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
}) => {

    useEffect(() => {
        setSelectedStrategies([]);
        setPosition('long');
    }, [marketType, setSelectedStrategies, setPosition]);

    const handleMarketTypeChange = (newMarketType: '선물' | '현물' | null) => {
        setMarketType(newMarketType);
        setSelectedStrategies([]);
        setPosition('long');
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
                    <OptionTitle>기간 선택</OptionTitle>
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
                                            }}
                                            dateFormat="yyyy-MM-dd"
                                            customInput={<DatePickerInput />}
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