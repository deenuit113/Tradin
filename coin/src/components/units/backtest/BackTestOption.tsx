import React from 'react';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as S from './BackTest.styles';
import { StrategyKey } from './MockStrategy';
import { FaRocket } from 'react-icons/fa';

const StyledDatePickerWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 100%;

    .react-datepicker-wrapper {
        width: 100%;
    }

    .react-datepicker-popper {
        width: 100%;
        position: absolute !important;
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
        width: 14.28%;
        padding: 5.5% 6.5%;
        margin: 0;
        text-align: center;
        align-items: center
    }

    .react-datepicker__day-name {
        width: 13.28%;
        line-height: 1em;
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
    selectedStrategies: string[];
    handleStrategyChange: (strategy: StrategyKey) => void;
    position: string;
    setPosition: (position: 'long' | 'short') => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    performBackTest: () => void;
    loading: boolean;
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
    loading
}) => {
    return (
        <S.OptionsContainer isVisible={isVisible}>
            <S.ButtonContainer>
                <S.BackTestButton onClick={performBackTest} disabled={loading}>
                <S.StyledRocketIcon className="RocketIcon" />BackTest Run
                </S.BackTestButton>
            </S.ButtonContainer>
            <OptionsLayout>
                <OptionGroup>
                    <OptionTitle>전략</OptionTitle>
                    <OptionContent>
                        <S.Option>
                            <input
                                type="checkbox"
                                checked={selectedStrategies.includes('A')}
                                onChange={() => handleStrategyChange('A')}
                            />
                            전략 A
                        </S.Option>
                        <S.Option>
                            <input
                                type="checkbox"
                                checked={selectedStrategies.includes('B')}
                                onChange={() => handleStrategyChange('B')}
                            />
                            전략 B
                        </S.Option>
                        <S.Option>
                            <input
                                type="checkbox"
                                checked={selectedStrategies.includes('C')}
                                onChange={() => handleStrategyChange('C')}
                            />
                            전략 C
                        </S.Option>
                    </OptionContent>
                </OptionGroup>
                
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
                            />
                            Short
                        </S.Option>
                    </OptionContent>
                </OptionGroup>

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