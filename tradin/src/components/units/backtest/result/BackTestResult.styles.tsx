import styled from '@emotion/styled';
import { css, keyframes } from "@emotion/react";
import { CSSProperties } from 'react';

// BackTest 결과 화면
export const ResultContainer = styled.div`
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    width: 100%;
    flex-grow: 1;
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: hidden;
    margin-bottom: 1rem;
    overflow-y: hidden;
`;

export const ResultDisplayContainer = styled.div`
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    width: 100%;
    flex-grow: 1;
    padding: 1.5rem;
    border-radius: 0px;
    overflow-x: hidden;
    overflow-y: auto;
`;

export const DisplayMainContent = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    max-width: 100%;
    display: flex;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;

    @media (max-width: 799px) {
        padding: 0.5rem;
    }
`;

export const DisplayContainer = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.backgroundColor};
`;

export const ResultHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0rem 1rem 1rem 1rem;
    width: 100%;
`;

export const ResultTitle = styled.h4`
    color: ${({ theme }) => theme.textColor};
    margin-right: 1rem;
    transition: all 0.3s ease;
    width: auto;
`;

export const ResultInnerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    overflow: hidden;
    margin-bottom: 1rem;
    padding: 0 2rem;
    gap: 10px;
`;



export const ResultSubtitle = styled.label`
    color: ${({ theme }) => theme.textColor};
    font-size: 1.1em;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0;
    border-bottom: 1px solid ${({ theme }) => theme.moreinnerborderColor};
    width: 100%;
    transition: all 0.3s ease;

    @media (max-width: 799px) {
        font-size: 0.7em;
    }
`;

// BackTest 결과 화면 실행 옵션

export const ExecutedOptionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    @media (max-width: 799px) {
        gap: 7px;
    }
`;

export const ExecutedOptionItem = styled.div`
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor|| '#f0f0f0'};
    color: ${({ theme }) => theme.timeTextColor};
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9em;

    .OptionIcon {
        margin-right: 5px;
    }

    @media (max-width: 799px) {
        font-size: 0.5em;
        padding: 3px 6px;
    }
`;

export const SaveButton = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 10px;
    cursor: pointer;
    border-radius: 20px;
    transition: background-color 0.3s;
    font-size: 800;

    &:hover {
        background-color: #45a049;
    }

    
    @media (max-width: 799px) {
        font-size: 0.5em;
        padding: 3px 6px;
        margin: 4px 2px 4px 10px;
    }
`;

export const ShareButton = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 10px;
    cursor: pointer;
    border-radius: 20px;
    transition: background-color 0.3s;
    font-size: 800;

    &:hover {
        background-color: #45a049;
    }

    
    @media (max-width: 799px) {
        font-size: 0.5em;
        padding: 3px 6px;
        margin: 4px 2px 4px 10px;
    }
`;

interface SaveOptionModalStyle {
    content?: CSSProperties;
    overlay?: CSSProperties;
  }
  
export const saveOptionModalStyle: SaveOptionModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#333',
        border: 'none',
        borderRadius: '6px',
        padding: '0'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1200,
    }
};

export const ModalContent = styled.div`
    background-color: ${({ theme }) => theme.backgroundColor};
    padding: 2rem 1rem 1rem 1rem;
    border-radius: 6px;
    z-index: 1200;
    width: 20vw;
    max-height: 30vh;
    margin: 0;

    @media (max-width: 799px) {
        width: 50vw;
    }
`;

export const ModalInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
    box-shadow: none;
    color: ${({ theme }) => theme.textColor};
`;

export const ModalButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
`

export const ModalButton = styled.button`
    padding: 4px 7px;
    border: none;
    border-radius: 6px;
    font-size: 0.7rem;
    cursor: pointer;
    background-color:  ${({ theme }) => theme.innerbackgroundColor};
    color:  ${({ theme }) => theme.textColor};
`;

// BackTest 결과 캐러셀

const slideInFromRight = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
`;

const slideOutToLeft = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
`;

const slideInFromLeft = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

const slideOutToRight = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100%);
    }
`;

export const CarouselContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const CarouselPage = styled.div<{ isActive: boolean; isNext: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    animation: ${props => {
        if (props.isActive) {
            return props.isNext ? slideInFromRight : slideInFromLeft;
        } else {
            return props.isNext ? slideOutToLeft : slideOutToRight;
        }
    }} 0.3s ease-in-out;
    animation-fill-mode: forwards;
`;

export const CarouselContent = styled.div<{ currentPage: number }>`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const CarouselButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
    font-size: 10px;
    border-radius: 50%;
    z-index: 2;
`;

export const PrevButton = styled(CarouselButton)`
    left: 0;
`;

export const NextButton = styled(CarouselButton)`
    right: 0;
`;

export const CarouselDots = styled.div`
    top: 95%;
    width: 100%;
    margin: 0;
    padding: 1% 0;
    height: 3%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;
export const CarouselDot = styled.div<{ active: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ active, theme }) => (active ? theme.CarouselDotActiveColor : theme.CarouselDotDefaultColor)};
    margin: 0 5px;
    cursor: pointer;
`;

// BackTest 차트 보기 방식

export const ChartControls = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    gap: 1rem;
    padding: 0 1rem;
`;

export const ChartSelect = styled.select`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px #777;
    }

    @media (max-width: 799px) {
        font-size: 0.7rem;
        padding: 0.2rem 0.4rem;
    }
`;