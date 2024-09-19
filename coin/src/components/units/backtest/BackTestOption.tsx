import React from 'react';
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
        width: 13.28%;
        padding: 1rem;
        text-align: center;
        align-items: center;
    }

    .react-datepicker__day-name {
        width: 13.28%;
        padding: 0.5rem 1rem;
    }

    .react-datepicker__day-names {
        padding: 0px 5px;
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
    flex-direction: row;
    gap: 5%;
    margin-left: 5%;
`;

const DatePickerOptionContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 5%;
`;

const DatePickersRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5%;
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
    marketType: 'futures' | 'spot' | null;
    setMarketType: (type: 'futures' | 'spot' | null) => void;
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
}) => {
    return (
        <S.OptionsContainer isVisible={isVisible} showToggleButton={showToggleButton}>
            <S.ButtonContainer>
                <S.BackTestButton onClick={performBackTest} disabled={loading}>
                    <S.StyledRocketIcon className="RocketIcon" />BackTest Run
                </S.BackTestButton>
            </S.ButtonContainer>
            <OptionsLayout>
                <OptionGroup>
                    <OptionTitle>시장 유형</OptionTitle>
                    <OptionContent>
                        <S.Option>
                            <input
                                type="radio"
                                name="marketType"
                                value="futures"
                                checked={marketType === 'futures'}
                                onChange={() => setMarketType('futures')}
                            />
                            선물
                        </S.Option>
                        <S.Option>
                            <input
                                type="radio"
                                name="marketType"
                                value="spot"
                                checked={marketType === 'spot'}
                                onChange={() => setMarketType('spot')}
                            />
                            현물
                        </S.Option>
                    </OptionContent>
                </OptionGroup>

                {marketType && (
                    <OptionGroup>
                        <OptionTitle>전략</OptionTitle>
                        <OptionContent>
                            {Object.entries(strategies)
                                .filter(([_, strategy]) => strategy.type === marketType)
                                .map(([key, _]) => (
                                    <S.Option key={key}>
                                        <input
                                            type="checkbox"
                                            checked={selectedStrategies.includes(key as StrategyKey)}
                                            onChange={() => handleStrategyChange(key as StrategyKey)}
                                        />
                                        {marketType === 'futures' ? '선물' : '현물'} 전략 {key.slice(1)}
                                    </S.Option>
                                ))}
                        </OptionContent>
                    </OptionGroup>
                )}
                
                {marketType && (
                    <OptionGroup>
                        <OptionTitle>포지션</OptionTitle>
                        <OptionContent>
                            <S.Option>
                                <input
                                    type="radio"
                                    name="position"
                                    value="long"
                                    checked={position === 'long'}
                                    onChange={() => setPosition('long')}
                                />
                                Long
                            </S.Option>
                            <S.Option>
                                <input
                                    type="radio"
                                    name="position"
                                    value="short"
                                    checked={position === 'short'}
                                    onChange={() => setPosition('short')}
                                    disabled={marketType === 'spot'}
                                />
                                Short
                            </S.Option>
                        </OptionContent>
                    </OptionGroup>
                )}

                <OptionGroup>
                    <OptionTitle>기간 선택</OptionTitle>
                    <DatePickerOptionContent>
                        <DatePickersRow>
                            <DatePickerContainer>
                                <DatePickerLabelInputContainer>
                                    <DatePickerLabel>시작 날짜</DatePickerLabel>
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
                            <DatePickerContainer>
                                <DatePickerLabelInputContainer>
                                    <DatePickerLabel>종료 날짜</DatePickerLabel>
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