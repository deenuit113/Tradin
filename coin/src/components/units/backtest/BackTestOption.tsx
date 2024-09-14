import React from 'react';
import * as S from './BackTest.styles';
import { StrategyKey } from './MockStrategy';

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
            <div>
                <div>
                    <S.OptionTitle>전략</S.OptionTitle>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedStrategies.includes('A')}
                            onChange={() => handleStrategyChange('A')}
                        />
                        전략 A
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedStrategies.includes('B')}
                            onChange={() => handleStrategyChange('B')}
                        />
                        전략 B
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedStrategies.includes('C')}
                            onChange={() => handleStrategyChange('C')}
                        />
                        전략 C
                    </label>
                </div>
                <div>
                    <S.OptionTitle>포지션</S.OptionTitle>
                    <label>
                        <input
                            type="radio"
                            name="position"
                            value="long"
                            checked={position === 'long'}
                            onChange={() => setPosition('long')}
                        />
                        Long
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="position"
                            value="short"
                            checked={position === 'short'}
                            onChange={() => setPosition('short')}
                        />
                        Short
                    </label>
                </div>
                <div>
                    <S.OptionTitle>기간 선택</S.OptionTitle>
                    <label>
                        시작 날짜
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        종료 날짜
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                </div>
                <S.BackTestButton onClick={performBackTest} disabled={loading}>
                    백테스트 실행
                </S.BackTestButton>
            </div>
        </S.OptionsContainer>
    );
};

export default OptionsContainer;