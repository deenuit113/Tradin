import * as S from "../ItemDetail.styles";
import { useRecoilState } from "recoil";
import { darkMode } from "../../../commons/atoms";

interface StrategyOptionProps {
    isMenuOpen: boolean;
    availableOptions: number[];
    selectedOption: number | null;
    handleCheckboxChange: (n: number) => void;
}

export default function SpotDetailOption({ isMenuOpen, availableOptions, selectedOption, handleCheckboxChange }: StrategyOptionProps): JSX.Element {
    const [isDarkMode] = useRecoilState(darkMode);
    
    return(
        <>
            { isMenuOpen &&
                <S.StrategyOptionDrop>
                    <S.OptionInnerContainer>
                        <S.OptionTitle darkMode={isDarkMode}> 비교: </S.OptionTitle>
                        {availableOptions.map(n => (
                            <S.ComparisonOption key={n} darkMode={isDarkMode}>
                                <input
                                    type="checkbox"
                                    checked={selectedOption === n}
                                    onChange={() => handleCheckboxChange(n)}
                                />
                                현물 {n}
                            </S.ComparisonOption>
                        ))}
                    </S.OptionInnerContainer>
                    <S.OptionHorizontalDivider/>
                    <S.OptionInnerContainer>
                        <S.OptionTitle darkMode={isDarkMode}>필터:</S.OptionTitle>
                    </S.OptionInnerContainer>
                    
                    
                </S.StrategyOptionDrop>
            }
        </>
    );
};