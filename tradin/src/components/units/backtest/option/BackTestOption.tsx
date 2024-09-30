import React, { useCallback, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as S from './BackTestOption.styles';
import { StrategyKey, strategies } from '../mockdata/MockStrategy';
import { OptionsContainerProps } from './BackTestOption.types';
import { validateAllOptions } from '../utils/validateOptions';
import { useBackTestOptionError } from '../../../../hooks/useBackTestOptionError';
import { useBackTestContext } from '../../../../contexts/BackTestContext';
import { useBackTestOptionDate } from '../../../../hooks/useBackTestOptionDate';
import { set } from 'react-datepicker/dist/date_utils';
import { FaCheck, FaPencilAlt } from 'react-icons/fa';

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
        marketType,
        setMarketType,
        setStartDate,
        setEndDate,
        savedOptions,
        removeOption,
        updateOptionName,
        savedMarketType,
        setSavedMarketType
    } = useBackTestContext();

    const {
        dateRange,
        startDate,
        endDate,
        handleDateRangeChange,
        handleStartDateChange,
        handleEndDateChange
    } = useBackTestOptionDate();

    const { errors, setError, resetErrors } = useBackTestOptionError();
    const [errorScroll, setErrorScroll] = useState(false);
    const [showSavedOptions, setShowSavedOptions] = useState(false);
    const [editingOption, setEditingOption] = useState<string | null>(null);
    const [newName, setNewName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (errorScroll) {
            const errorElements = document.querySelectorAll('.error');
            if (errorElements.length > 0) {
                errorElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setErrorScroll(false);
        }
    }, [errorScroll, errors]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSavedOptions(false);
                handleInputBlur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleStrategyChange = (strategy: StrategyKey) => {
        setSelectedStrategies(prev =>
            prev.includes(strategy)
                ? prev.filter(s => s !== strategy)
                : [...prev, strategy]
        );
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

    const applySavedOption = useCallback((option: string) => {
        const [newMarketType, savedStrategies, savedPosition, savedDateRange] = option.split(' / ');
        
        setSavedMarketType(newMarketType as '선물' | '현물');
        setMarketType(newMarketType as '선물' | '현물');
        
        setSelectedStrategies(savedStrategies.split(', ') as StrategyKey[]);
    
        setPosition(savedPosition as 'long' | 'short');
        
        const [savedStartDate, savedEndDate] = savedDateRange.replace('기간 ', '').split(' ~ ');
        setStartDate(savedStartDate);
        setEndDate(savedEndDate);
    }, [setSavedMarketType, setMarketType, setSelectedStrategies, setPosition, setStartDate, setEndDate]);

    const handleEditClick = (name: string) => {
        setEditingOption(name);
        setNewName(name);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleUpdateName = (oldName: string) => {
        if (newName && newName !== oldName) {
            updateOptionName(oldName, newName);
        }
        setEditingOption(null);
    };

    const handleInputBlur = () => {
        setEditingOption(null);
    };
    
    return (
        <S.OptionsContainer isVisible={isVisible} showToggleButton={showToggleButton}>
            <S.RunButtonContainer>
                {savedOptions.length > 0 && (
                    <S.SavedOptionsWrapper ref={dropdownRef}>
                        <S.SavedOptionsButton 
                            onClick={() => setShowSavedOptions(!showSavedOptions)}
                            isActive={showSavedOptions}
                        >
                            저장된 옵션 ({savedOptions.length})
                        </S.SavedOptionsButton>
                        {showSavedOptions && (
                            <S.SavedOptionsDropdown>
                                {savedOptions.map(({ name, description, option }) => (
                                    <S.SavedOptionItem key={name}>
                                        <S.SavedOptionContent onClick={() => applySavedOption(option)}>
                                            {editingOption === name ? (
                                                <S.EditNameInput
                                                    value={newName}
                                                    ref={inputRef}
                                                    onBlur={handleInputBlur}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            ) : (
                                                <S.SavedOptionName>{name}</S.SavedOptionName>
                                            )}
                                            <S.SavedOptionDescription>{description}</S.SavedOptionDescription>
                                        </S.SavedOptionContent>
                                        <S.ButtonGroup>
                                            {editingOption === name ? (
                                                <S.EditButton onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleUpdateName(name);
                                                }}>
                                                    <FaCheck />
                                                </S.EditButton>
                                            ) : (
                                                <S.EditButton onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(name);
                                                }}>
                                                    <FaPencilAlt />
                                                </S.EditButton>
                                            )}
                                            <S.RemoveButton onClick={() => removeOption(name)}>X</S.RemoveButton>
                                        </S.ButtonGroup>
                                    </S.SavedOptionItem>
                                ))}
                            </S.SavedOptionsDropdown>
                        )}
                    </S.SavedOptionsWrapper>
                )}
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