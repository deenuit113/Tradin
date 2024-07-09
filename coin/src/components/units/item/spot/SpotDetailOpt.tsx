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
                    {availableOptions.map(n => (
                        <label key={n}>
                            <input
                                type="checkbox"
                                checked={selectedOption === n}
                                onChange={() => handleCheckboxChange(n)}
                            />
                            현물 {n}
                        </label>
                    ))}
                </S.StrategyOptionDrop>
            }
        </>
    );
};