import * as S from "../ItemDetail.styles";

interface StrategyOptionProps {
    isMenuOpen: boolean;
    availableOptions: number[];
    selectedOption: number | null;
    handleCheckboxChange: (n: number) => void;
}

export default function SpotDetailOption({ isMenuOpen, availableOptions, selectedOption, handleCheckboxChange }: StrategyOptionProps): JSX.Element {
    
    return(
        <>
            { isMenuOpen &&
                <S.StrategyOptionDrop>
                    <S.OptionInnerContainer>
                        <S.OptionTitle> 비교: </S.OptionTitle>
                        {availableOptions.map(n => (
                            <S.ComparisonOption key={n} >
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
                        <S.OptionTitle>필터:</S.OptionTitle>
                    </S.OptionInnerContainer>
                    
                    
                </S.StrategyOptionDrop>
            }
        </>
    );
};