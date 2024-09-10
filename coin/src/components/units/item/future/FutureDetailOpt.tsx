import * as S from "../ItemDetail.styles";

interface StrategyOptionProps {
    isMenuOpen: boolean;
    availableOptions: number[];
    selectedOption: number | null;
    handleCheckboxChange: (n: number) => void;
    filters: { [key: string]: boolean };
    handleFilterChange: (key: string) => void;
}

const filtersList = [
    { key: "coin", label: "코인", mandatory: true },
    { key: "position", label: "포지션", mandatory: true },
    { key: "entryPrice", label: "진입가격", mandatory: true },
    { key: "profitLoss", label: "누적 손익", mandatory: false },
    { key: "winRate", label: "승률", mandatory: false },
    { key: "profitFactor", label: "수익 팩터", mandatory: false },
    { key: "trades", label: "횟수", mandatory: false },
    { key: "averageBars", label: "평균 봉수", mandatory: false },
    { key: "averageProfit", label: "평균 수익", mandatory: false }
];

export default function FutureDetailOption({
    isMenuOpen, availableOptions, selectedOption, handleCheckboxChange, filters, handleFilterChange 
}: StrategyOptionProps): JSX.Element {
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
                    <S.OptionFilterContainer>
                        <S.OptionTitle>필터:</S.OptionTitle>
                        {filtersList.map(filter => (
                            <S.FilterOption key={filter.key}>
                                <input
                                    type="checkbox"
                                    checked={filters[filter.key]}
                                    onChange={() => handleFilterChange(filter.key)}
                                    disabled={filter.mandatory}
                                />
                                {filter.label}
                            </S.FilterOption>
                        ))}
                    </S.OptionFilterContainer>
                </S.StrategyOptionDrop>
            }
        </>
    );
}
