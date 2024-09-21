import styled from '@emotion/styled';
import { css } from "@emotion/react";
import { FaRocket } from "react-icons/fa";

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
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, padding 0.3s ease-in-out;
    
    ${({ isVisible }) => isVisible
        ? css`
            max-height: 2000px; // 충분히 큰 값으로 설정
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
`;

export const OptionTitle = styled.h4`
    margin-bottom: 2%;
    font-size: 1.2em;
    color: ${({ theme }) => theme.textColor};
`;

export const OptionContent = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-left: 5%;
`;

export const OptionButton = styled.button<{ isSelected: boolean }>`
    padding: 10px 15px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 20px;
    background-color: ${({ isSelected, theme }) => (isSelected ? theme.OptionHighlightColor : theme.backgroundColor)};
    color: ${({ isSelected, theme }) => (isSelected ? theme.backgroundColor : theme.textColor)};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.hoverColor};
    }
`;

export const HorizontalDivider = styled.div`
    width: 100%;
    height: 1px;
    border: 1px solid ${({ theme }) => theme.moreinnerbackgroundColor};
    margin-bottom: 1rem;
`;

// DatePicker
export const StyledDatePickerWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 5px;

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
        gap: 3px;
        height: 240px;
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
        background-color: ${({ theme }) => theme.highlightColor};
        color: ${({ theme }) => theme.backgroundColor};
    }

    .react-datepicker__day,
    .react-datepicker__day-name {
        width: 12%;
        height: 40px;
        line-height: 40px;
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
            height: 150px;
        }

        .react-datepicker__day,
        .react-datepicker__day-name {
            height: 25px;
            line-height: 25px;
        }
    }
`;

export const DatePickerOptionContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const DatePickersRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const DatePickerInput = styled.input`
    text-align: center;
    width: 100%;
    padding: 2%;
    border: 1px solid ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.backTestInputBackgroundColor};
    color: ${({ theme }) => theme.textColor};
    border-radius: 4px 4px 0px 0px;
    font-size: 1em;
`;

export const DateRangeSeparator = styled.span`
    font-size: 1.5em;
    color: ${({ theme }) => theme.textColor};
    margin: 0 10px;
    display: flex;
    align-items: center;
`;

export const DatePickerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

export const DatePickerLabelInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

export const DateRangeSelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const DateOptionTitle = styled.h4`
    font-size: 1.2em;
    color: ${({ theme }) => theme.textColor};
`;

export const DateRangeSelect = styled.select`
    width: 20%;
    padding: 4px 8px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.backTestInputBackgroundColor};
    color: ${({ theme }) => theme.textColor};
    border-radius: 4px;
    font-size: 0.8em;
    margin-top: 2rem;
    cursor: pointer;

    @media (max-width: 799px) {
        width: 30%;
    }
`;