import React, { useCallback, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StrategyKey, strategies } from '../mockdata/MockStrategy';
import { OptionsContainerProps } from './BackTestOption.types';
import { validateAllOptions } from '../utils/validateOptions';
import { useBackTestOptionError } from '../../../../hooks/useBackTestOptionError';
import { useBackTestContext } from '../../../../contexts/BackTestContext';
import { useBackTestOptionDate } from '../../../../hooks/useBackTestOptionDate';
import { FaArrowDown, FaArrowUp, FaCheck, FaCoins, FaEraser, FaExchangeAlt, FaPencilAlt, FaRocket } from 'react-icons/fa';
import { CheckboxGroup, createListCollection, Group, Icon, Separator, useRadioCardContext } from '@chakra-ui/react';
import { RadioCardItem, RadioCardRoot } from '@/components/ui/radio-card';
import { CheckboxCard } from '@/components/ui/checkbox-card';
import * as C from "./styles/BackTestOption.components";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { NativeSelectField, NativeSelectRoot } from '@/components/ui/native-select';

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
        setDateRange,
        startDate,
        endDate,
        handleDateRangeChange,
        handleStartDateChange,
        handleEndDateChange
    } = useBackTestOptionDate();

    const { errors, setErrors, setError, resetErrors } = useBackTestOptionError();
    const [errorScroll, setErrorScroll] = useState(false);
    const [showSavedOptions, setShowSavedOptions] = useState(false);
    const [editingOption, setEditingOption] = useState<string | null>(null);
    const [newName, setNewName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 에러가 있는 상태에서 옵션을 다시 선택했을 때 에러를 지움.
    useEffect(() => {
        if (errors.typeError || errors.strategyError || errors.positionError || errors.dateError) {
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

            if (!isValid) {
                setErrorScroll(true);
            }
        }
    }, [selectedStrategies, marketType, position, startDate, endDate]);

    // 옵션을 잘못 선택하고 백테스트 실행 버튼을 누를 시 해당 부분으로 스크롤 이동
    useEffect(() => {
        if (errorScroll) {
            const errorElements = document.querySelectorAll('.error');
            if (errorElements.length > 0) {
                errorElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setErrorScroll(false);
        }
    }, [errorScroll, errors]);

    // 저장된 옵션 바깥 영역 클릭시 닫음 > chakra menu 사용시 없어도 됨
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !(event.target as HTMLElement).closest('.fa-check-button') // 수정 버튼 예외 처리
            ) {
                setShowSavedOptions(false);
                handleInputBlur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    // 전략 체크박스 선택 시
    const handleStrategyChange = (strategyKey: StrategyKey) => {
        setSelectedStrategies((prevSelected) => {
            if (prevSelected.includes(strategyKey)) {
                return prevSelected.filter((key) => key !== strategyKey);
            } else {
                return [...prevSelected, strategyKey];
            }
        });
    };
    
    // 백테스트 실행 시, 옵션의 validation 검사 (에러 있을 시, 스크롤 이동)
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

    // 저장된 옵션 현재 옵션에 적용
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

    useEffect(()=>{
        if(selectedStrategies.length > 0) {
            setErrors(prevErrors => ({ ...prevErrors, strategyError: false }));
        }
    },[selectedStrategies])
    
    const selectedDateRange = createListCollection({
        items: [
            { label: '최근 1개월', value: '1개월' },
            { label: '최근 3개월', value: '3개월' },
            { label: '최근 6개월', value: '6개월' },
            { label: '최근 1년', value: '1년' },
            { label: '최근 3년', value: '3년' },
            { label: '최근 5년', value: '5년' },
            { label: '사용자 지정', value: '사용자 지정' },
        ]
    })

    return (
        <C.OptionsContainer showToggleButton={showToggleButton}>
            <C.ButtonsContainer>

                {savedOptions.length > 0 && (
                    <C.SavedOptionsWrapper ref={dropdownRef}>
                        <C.SavedOptionsButton 
                            onClick={() => setShowSavedOptions(!showSavedOptions)}
                            isActive={showSavedOptions}
                        >
                            저장된 옵션 ({savedOptions.length})
                        </C.SavedOptionsButton>
                        {showSavedOptions && (
                            <C.SavedOptionsDropdown>
                                {savedOptions.map(({ name, description, option }) => (
                                    <C.SavedOptionItem key={name}>
                                        <C.SavedOptionContent onClick={() => applySavedOption(option)}>
                                            {editingOption === name ? (
                                                <C.EditNameInput
                                                    value={newName}
                                                    ref={inputRef}
                                                    onBlur={(e) => {
                                                        e.stopPropagation();
                                                        handleInputBlur();
                                                    }}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            ) : (
                                                <C.SavedOptionName>{name}</C.SavedOptionName>
                                            )}
                                            <C.SavedOptionDescription>{description}</C.SavedOptionDescription>
                                        </C.SavedOptionContent>
                                        <C.SavedOptionsButtonGroup>
                                            {editingOption === name ? (
                                                <C.EditButton 
                                                    className="fa-check-button"
                                                    onMouseDown={(e) => {
                                                    e.stopPropagation();
                                                    handleUpdateName(name);
                                                }}>
                                                    <FaCheck className="fa-check-button" />
                                                </C.EditButton>
                                            ) : (
                                                <C.EditButton onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(name);
                                                }}>
                                                    <FaPencilAlt />
                                                </C.EditButton>
                                            )}
                                            <C.RemoveButton onClick={() => removeOption(name)}>
                                                <FaEraser/>
                                            </C.RemoveButton>
                                        </C.SavedOptionsButtonGroup>
                                    </C.SavedOptionItem>
                                ))}
                            </C.SavedOptionsDropdown>
                        )}
                    </C.SavedOptionsWrapper>
                )}

                <C.BackTestButton onClick={handlePerformBackTest} disabled={loading}>
                    <FaRocket className="RocketIcon" /> 백테스트 실행
                </C.BackTestButton>
            </C.ButtonsContainer>
            <C.OptionsGroup>
                <C.OptionWrapper className={errors.typeError ? 'error' : ''}>
                    <C.OptionHeaderContainer>
                        <C.OptionInfoContainer>
                            <C.OptionTitle>유형</C.OptionTitle>
                            {errors.typeError && <C.ErrorMsg>유형을 다시 설정해주세요.</C.ErrorMsg>}
                        </C.OptionInfoContainer>
                    </C.OptionHeaderContainer>
                    <Separator width="100%" size="sm" marginBottom="15px"/>
                    
                        <RadioCardRoot size="sm" orientation="vertical" align="center" colorPalette={errors.typeError? "red": "blue"}>
                            <Group width="100%" display="flex" flexDirection="row" gap="20px">
                                <RadioCardItem
                                    icon={
                                        <Icon fontSize="2xl" color="fg.muted" mb="2">
                                            <FaExchangeAlt/>
                                        </Icon>
                                    }
                                    label='선물'
                                    value='선물'
                                    indicator={false}
                                    onChange={() => setMarketType('선물')}
                                    borderColor="borderGrayColor"
                                />
                                <RadioCardItem
                                    icon={
                                        <Icon fontSize="2xl" color="fg.muted" mb="2">
                                            <FaCoins/>
                                        </Icon>
                                    }
                                    label='현물'
                                    value='현물'
                                    indicator={false}
                                    onChange={() => setMarketType('현물')}
                                    borderColor="borderGrayColor"
                                />
                            </Group>
                        </RadioCardRoot>
                </C.OptionWrapper>

                {marketType && (
                    <C.OptionWrapper className={errors.strategyError ? 'error' : ''}>
                        <C.OptionHeaderContainer>
                            <C.OptionInfoContainer>
                                <C.OptionTitle>전략</C.OptionTitle>
                                {errors.strategyError && <C.ErrorMsg>전략을 다시 설정해주세요.</C.ErrorMsg>}
                            </C.OptionInfoContainer>
                        </C.OptionHeaderContainer>
                        <Separator width="100%" size="sm" marginBottom="15px"/>

                        <CheckboxGroup colorPalette={errors.strategyError? "red": "blue"} width="100%" display="flex" flexDirection="row" gap="20px">
                            {Object.entries(strategies)
                                .filter(([_, strategy]) => strategy.type === marketType)
                                .map(([key, _]) => (
                                    <CheckboxCard
                                        label={`${marketType === '선물' ? '선물' : '현물'} 전략 ${key.slice(1)}`}
                                        key={key}
                                        borderColor="borderGrayColor"
                                        checked={selectedStrategies.includes(key as StrategyKey)}
                                        onChange={() => handleStrategyChange(key as StrategyKey)}
                                    />
                                ))}
                        </CheckboxGroup>
                    </C.OptionWrapper>
                )}
                
                {marketType && (
                    <C.OptionWrapper className={errors.positionError ? 'error' : ''}>
                        <C.OptionHeaderContainer>
                            <C.OptionInfoContainer>
                                <C.OptionTitle>포지션</C.OptionTitle>
                                {errors.positionError && <C.ErrorMsg>포지션을 다시 설정해주세요.</C.ErrorMsg>}
                            </C.OptionInfoContainer>
                        </C.OptionHeaderContainer>
                        <Separator width="100%" size="sm" marginBottom="15px"/>

                        <RadioCardRoot defaultValue="long" size="sm" orientation="vertical" align="center" colorPalette={errors.positionError? "red": "blue"}>
                            <Group width="100%" display="flex" flexDirection="row" gap="20px">
                                <RadioCardItem
                                    icon={
                                        <Icon fontSize="2xl" color="fg.muted" mb="2">
                                            <FaArrowUp/>
                                        </Icon>
                                    }
                                    label='Long'
                                    value='long'
                                    indicator={false}
                                    onChange={() => setPosition('long')}
                                    borderColor="borderGrayColor"
                                />
                                <RadioCardItem
                                    icon={
                                        <Icon fontSize="2xl" color="fg.muted" mb="2">
                                            <FaArrowDown/>
                                        </Icon>
                                    }
                                    disabled={marketType==='현물'}
                                    label='Short'
                                    value='short'
                                    indicator={false}
                                    onChange={() => setPosition('short')}
                                    borderColor="borderGrayColor"
                                />
                            </Group>
                        </RadioCardRoot>
                    </C.OptionWrapper>
                )}

                <C.OptionWrapper className={errors.dateError ? 'error' : ''}>
                    <C.OptionHeaderContainer>
                        <C.OptionInfoContainer>
                            <C.OptionTitle>기간 선택</C.OptionTitle>
                            {errors.dateError && <C.ErrorMsg>기간을 다시 설정해주세요.</C.ErrorMsg>}
                        </C.OptionInfoContainer>

                        <NativeSelectRoot
                            width="30%"
                            padding="4px"
                            fontSize="0.8em"
                            marginTop="1rem"
                            cursor="pointer"
                            size="sm"
                            colorPalette="blue"
                        >
                            <NativeSelectField
                                placeholder='사용자 지정'
                                value={dateRange}
                                onChange={handleDateRangeChange}
                                bg="backgroundColor"
                                color="textColor"
                                borderColor="borderGrayColor"
                            >
                                <option value="1개월">최근 1개월</option>
                                <option value="3개월">최근 3개월</option>
                                <option value="6개월">최근 6개월</option>
                                <option value="1년">최근 1년</option>
                                <option value="3년">최근 3년</option>
                                <option value="5년">최근 5년</option>
                            </NativeSelectField>
                        </NativeSelectRoot>

                    </C.OptionHeaderContainer>
                    <Separator width="100%" size="sm" margin="15px 0"/>
                    <C.DatePickerOptionContent>
                        <C.DatePickerContainer hasError={errors.dateError}>
                            <C.DatePickerWrapper>
                                <DatePicker
                                    selected={startDate ? new Date(startDate) : null}
                                    onChange={handleStartDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    customInput={<C.DatePickerInput />}
                                    openToDate={startDate ? new Date(startDate) : undefined}
                                    open={true}
                                />
                            </C.DatePickerWrapper>
                        </C.DatePickerContainer>
                        <C.DateRangeSeparator>~</C.DateRangeSeparator>
                        <C.DatePickerContainer hasError={errors.dateError}>
                            <C.DatePickerWrapper>
                                <DatePicker
                                    selected={endDate ? new Date(endDate) : null}
                                    onChange={handleEndDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    customInput={<C.DatePickerInput />}
                                    open={true}
                                />
                            </C.DatePickerWrapper>
                        </C.DatePickerContainer>
                    </C.DatePickerOptionContent>
                </C.OptionWrapper>
            </C.OptionsGroup>
        </C.OptionsContainer>
    );
};

export default OptionsContainer;