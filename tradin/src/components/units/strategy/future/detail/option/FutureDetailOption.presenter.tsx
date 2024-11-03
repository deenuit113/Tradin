import React, { useMemo } from 'react';
import * as S from "../../../ItemDetailOption.styles";
import { FutureDetailOptionUIProps } from './FutureDetailOption.types';

export default function FutureDetailOptionUI(props: FutureDetailOptionUIProps): JSX.Element {
    const filterOptions = useMemo(() => 
        props.filtersList.map(filter => (
            <S.FilterOption key={filter.key}>
                <input
                    type="checkbox"
                    checked={props.localFilters[filter.key]}
                    onChange={() => !filter.mandatory && props.handleLocalFilterChange(filter.key)}
                    disabled={filter.mandatory}
                />
                {filter.label}
            </S.FilterOption>
        )), [props.localFilters, props.handleLocalFilterChange]);

    return(
        <>
            { props.isMenuOpen &&
                <S.StrategyOptionDrop>
                    <S.OptionInnerContainer>
                        <S.OptionTitle> 비교: </S.OptionTitle>
                        {props.availableOptions.map(n => (
                            <S.ComparisonOption key={n} >
                                <input
                                    type="checkbox"
                                    checked={props.selectedOption === n}
                                    onChange={() => props.handleCheckboxChange(n)}
                                />
                                선물 {n}
                            </S.ComparisonOption>
                        ))}
                    </S.OptionInnerContainer>
                    <S.OptionHorizontalDivider/>
                    <S.OptionFilterContainer>
                        <S.OptionTitle>필터:</S.OptionTitle>
                        {filterOptions}
                    </S.OptionFilterContainer>
                    <S.OptionHorizontalDivider/>
                    <S.ButtonContainer>
                        <S.BackTestButton onClick={props.handleBackTestClick}>
                            <S.styledPlayIcon className='BackTestIcon'/>BackTest
                        </S.BackTestButton>
                    </S.ButtonContainer>
                </S.StrategyOptionDrop>
            }
        </>
    );
}