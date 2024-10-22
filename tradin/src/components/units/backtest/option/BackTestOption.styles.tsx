import styled from '@emotion/styled';
import { css } from "@emotion/react";
import { FaArrowDown, FaArrowUp, FaRocket } from "react-icons/fa";

// Option

export const OptionsContainer = styled.div<{ isVisible: boolean, showToggleButton: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    border-radius: ${({ showToggleButton }) => (showToggleButton ? '0px 0px 8px 8px' : '8px')};
    overflow: hidden;
    transform-origin: top center;
    position: relative;
    z-index: 1;
    margin-top: -1px;
    transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, visibility 0.5s ease-in-out, padding 0.5s ease-in-out;
    height: auto;
    
    ${({ isVisible }) => isVisible
        ? css`
            max-height: 2000px;
            opacity: 1;
            visibility: visible;
            padding: 1rem 2rem;
          `
        : css`
            max-height: 0;
            opacity: 0;
            visibility: hidden;
            padding: 0;
          `
    }
`;

export const RunButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 20px 0px;
    width: 100%;
`;

export const SavedOptionsWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const SavedOptionsButton = styled.button<{ isActive: boolean }>`
    background-color: ${({ isActive, theme }) => (isActive ? theme.OptionHighlightColor : theme.backgroundColor)};
    color: ${({ isActive, theme }) => (isActive ? theme.reversedTextColor : theme.textColor)};
    border: none;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin-right: 10px;
    margin-top: 1rem;
    cursor: pointer;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 700;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ isActive, theme }) => (isActive ? theme.OptionHighlightColor : theme.innerbackgroundColor)};
    }

    @media (max-width: 799px) {
        padding: 5px 10px;
        font-size: 0.8rem;
        font-weight: 550;
    }
`;

export const SavedOptionsDropdown = styled.div`
    position: absolute;
    top: 100%;
    right: 0%;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 1000;
    min-width: 360px;
    max-height: 200px;
    overflow-y: auto;
    background-color: ${({ theme }) => theme.backgroundColor};

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color:  ${({ theme }) => theme.scrollbarThumbColor};
        border-radius: 6px;
        transition: background-color 0.3s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 8px;
    }

    &:hover {
        &::-webkit-scrollbar {
            width: 8px;
        }
    }

    @media (max-width: 799px) {
        right: 0%;
        min-width: 250px;
    }
`;

export const SavedOptionItem = styled.div`
    padding: 10px 5px 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${({ theme }) => theme.widgetDropDownHoverColor};
    }
`;

export const SavedOptionContent = styled.div`
    flex: 1;
    cursor: pointer;
`;

export const SavedOptionName = styled.div`
    width: 95%;
    font-family: Arial, sans-serif;
    font-weight: 600;
    font-size: 1em;
    padding: 5px;
    color: ${({ theme }) => theme.textColor};
`;

export const SavedOptionDescription = styled.div`
    font-size: 0.7em;
    font-weight: 100;
    color: ${({ theme }) => theme.timeTextColor};
    margin-top: 2px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
`;

export const EditButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.textColor};
`;

export const EditNameInput = styled.input`
    width: 95%;
    font-family: Arial, sans-serif;
    font-weight: 600;
    font-size: 1em;
    background-color: transparent;
    padding: 5px;
    border: none;
    border-bottom: 3px solid ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.textColor};
    outline: none; 

    &:focus {
        border: none;
        border-bottom: 3px solid ${({ theme }) => theme.textColor};
    }
`;

export const RemoveButton = styled.button`
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BackTestButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 6px;
    padding: 10px 15px;
    float: right;
    margin-top: 1rem;
    transition: all 0.3 ease-in-out;
    font-weight: 700;
    background-color: ${({ theme }) => theme.backTestButtonColor};
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 0.9rem;

    :hover {
        background-color: ${({ theme }) => theme.backTestButtonHoverColor};
    }

    :hover .RocketIcon {
        transform: translate(30px, -30px);
    }

    .RocketIcon {
        margin-right: 5px;
        transition: transform 0.3s ease-in-out;
    }

    @media (max-width: 799px) {
        padding: 5px 10px;
        font-size: 0.8rem;
        font-weight: 550;
    }
`

export const StyledRocketIcon = styled(FaRocket)`
`;

export const ErrorMessage = styled.p`
    color: #ff6b6b;
    font-size: 0.6em;
    margin-top: 4px;
    margin-bottom: 0;
    height: 1em;
    line-height: 1em;
    opacity: 1;
    transition: all 0.3s ease;
`;

// Option Select

export const OptionsLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5%;
    padding: 1rem;
`;

export const OptionGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    transition: all 0.3s ease;
`;


export const OptionHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 2.5em;
`;

export const OptionHeaderInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

export const OptionTitle = styled.label`
    margin-bottom: 2%;
    font-size: 1.2em;
    font-weight: 600;
    color: ${({ theme }) => theme.textColor};
`;

export const OptionContent = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 0 3%;
`;

export const OptionButton = styled.button<{ selected: boolean, hasError?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    border: 1px solid ${({ selected, hasError, theme }) => 
        hasError ? '#ff6b6b' : 
        selected ? theme.OptionHighlightColor : 
        theme.borderColor};
    border-radius: 20px;
    background-color: ${({ selected, theme }) => (selected ? theme.OptionHighlightColor : theme.backgroundColor)};
    color: ${({ selected: selected, theme }) => (selected ? theme.backgroundColor : theme.textColor)};
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
        background-color: ${({ selected: selected, theme }) => (selected ? theme.OptionHighlightColor : theme.hoverColor)};
    }
`;

export const ArrowUpIcon = styled(FaArrowUp)<{ selected: boolean }>`
    color: ${({ selected: selected, theme }) => (selected ? 'red' : theme.textColor)};
    margin-left: 5px; 
`

export const ArrowDownIcon = styled(FaArrowDown)<{ selected: boolean }>`
    color: ${({ selected: selected, theme }) => (selected ? 'blue' : theme.textColor)};
    margin-left: 5px; 
`

export const HorizontalDivider = styled.div`
    width: 100%;
    height: 1px;
    border: 1px solid ${({ theme }) => theme.moreinnerbackgroundColor};
    margin-bottom: 1rem;
    margin-top: 0.3rem;
`;

// DatePicker
export const StyledDatePickerWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 0.1px;

    .react-datepicker-wrapper {
        width: 100%;
    }

    .react-datepicker-popper {
        width: 100%;
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
        border-top: none;
        border-radius: 0px 0px 4px 4px;
    }

    .react-datepicker__triangle {
        display: none;
    }

    .react-datepicker__month-container {
        width: 100%;
        border-radius: 0px 0px 4px 4px;
    }

    .react-datepicker__month {
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        gap: 2px;
        height: 194px;
    }

    .react-datepicker__week {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2%;
    }

    .react-datepicker__header {
        background-color: ${({ theme }) => theme.backgroundColor};
        border-bottom: 1px solid ${({ theme }) => theme.borderColor};
        padding-top: 10px;
    }

    .react-datepicker__current-month {
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
        background-color: ${({ theme }) => theme.OptionHighlightColor};
        color: ${({ theme }) => theme.backgroundColor};
    }

    .react-datepicker__day {
        border-radius: 20px;
    }

    .react-datepicker__day,
    .react-datepicker__day-name {
        width: 12%;
        height: 30px;
        line-height: 30px;
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 0.8em;
    }

    .react-datepicker__day--outside-month {
        visibility: hidden;
    }

    .react-datepicker__day-names {
        display: flex;
        justify-content: space-between;
        padding: 0 2%;
    }

    @media (max-width: 600px) {
        .react-datepicker-popper {
            display: none;
        }
    }

    @media (max-width: 799px) {
        .react-datepicker__month {
            height: 134px;
        }

        .react-datepicker__day,
        .react-datepicker__day-name {
            height: 20px;
            line-height: 20px;
        }
    }
`;

export const DatePickerOptionContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0 3%;
`;

export const DatePickersRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
    gap: 12px;

    @media (max-width: 799px) {
        width: 95%;
        gap: none;
    }
`;

export const DatePickerInput = styled.input<{ hasError?: boolean }>`
    text-align: center;
    width: 100%;
    padding: 2%;
    border: 1px solid ${({ theme, hasError }) => hasError ? '#ff6b6b' : theme.borderColor};
    background-color: ${({ theme }) => theme.backTestInputBackgroundColor};
    color: ${({ theme }) => theme.textColor};
    border-radius: 4px 4px 0px 0px;
    font-size: 1em;
    font-weight: 700;
`;

export const DateRangeSeparator = styled.span`
    font-size: 1.5em;
    color: ${({ theme }) => theme.textColor};
    margin: 0 10px;
    display: flex;
    align-items: center;

    @media (max-width: 799px) {
        margin: 0;
    }
`;

export const DatePickerContainer = styled.div<{ hasError?: boolean }>`
    display: flex;
    flex-direction: column;
    width: 50%;
    ${({ hasError }) => hasError && css`
        border: 1px solid #ff6b6b;
        border-radius: 4px;
    `}
`;

export const DatePickerLabelInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

export const DateRangeSelect = styled.select`
    width: 15%;
    padding: 4px 8px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.backTestInputBackgroundColor};
    color: ${({ theme }) => theme.textColor};
    border-radius: 4px;
    font-size: 0.8em;
    margin-top: 1rem;
    cursor: pointer;

    @media (max-width: 600px) {
        width: 45%;
    }

    @media (max-width: 899px) {
        width: 30%;
    }
`;