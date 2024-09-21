import styled from "@emotion/styled";
import { FaRocket } from "react-icons/fa";
import { css } from "@emotion/react";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.backgroundColor};
`;

export const BackTestHeader = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bolder;
    color: ${({ theme }) => theme.textColor};
    padding: 0rem 1rem;
    background-color: ${({ theme }) => theme.breadcrumbBackgroundColor};
    transition: width 0.3s ease, margin-left 0.3s ease;
    
    .FaAngleRight{
        margin-left: 10px;
    }
`;

export const MainContent = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    max-width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 2rem;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 12px;
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
            width: 12px;
        }
    }

    @media (max-width: 799px) {
        padding: 0.5rem;
    }
`;

export const BackTestContainer = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.backgroundColor};
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: visible;

    @media all and (min-width:359px) and (max-width: 799px) {
        padding: 1rem;
    }
`;

export const OptionToggleButton = styled.button<{ isVisible: boolean }>`
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: ${({ isVisible }) => (isVisible ? '6px 6px 0px 0px' : '6px')};
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    color: ${({ theme }) => theme.textColor};
    position: relative;
    z-index: 2;
    transition: border-radius 0.3s ease-in-out;
    .FilterIcon {
        margin-right: 5px;
        color: ${({ theme }) => theme.iconColor};
    }
`;

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

export const OptionTitle = styled.h4`
    color: ${({ theme }) => theme.textColor};
`

export const Option = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.textColor};

    > * {
        margin-right: 10px;
    }

    &.date-picker-container {
        flex-direction: column;
        align-items: flex-start;

        > * {
            margin-right: 0;
            margin-bottom: 5px;
            width: 100%;
        }
    }
`;

export const ButtonContainer = styled.div`
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
