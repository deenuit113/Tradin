import styled from "@emotion/styled";
import { CSSProperties } from "react";
import { keyframes } from "@emotion/react";

interface ModalStyles {
    overlay?: CSSProperties;
    content?: CSSProperties;
}

export const modalStyles: ModalStyles = {
    overlay: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    content: {
        top: '50%',
        left: '50%',
        width: '5%',
        height: '1%',
        backgroundColor: 'transparent',
        border: 'none',
    }
};

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.5);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
`;

export const ModalContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 30%;
    max-height: 90%;
    top: 50%;
    left: 50%;
    translate: -50% -50%; /* 중앙에 고정 */
    background-color: ${({ theme }) => theme.backgroundColor};
    padding: 2rem;
    border: 2px solid ${({ theme }) => theme.borderColor};
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    overflow-y: auto;
    z-index: 1002;
    transform-origin: center;

    animation: ${fadeIn} 200ms ease-out;

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

    @media all and (min-width: 359px) and (max-width: 799px) {
        width: 55%;
        padding: 1.5rem;
    }
`;

export const ModalTitle = styled.h1`
    font-size: 40px;
    color: ${({ theme }) => theme.iconColor};
    margin: 0 0 1rem 0;
`

export const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 350px;
    height: auto;
    margin-bottom: 1rem;
`

export const InputContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

export const ErrorMsgWrapper = styled.div`
    padding: 0 1rem;
    width: 100%;
    font-size: 11px;
    color: red;
    text-align: left;
    word-wrap: break-word;
`;

export const InputPlaceHolder = styled.label`
    position: absolute;
    top: 19px;
    left: 28px;
    font-size: 16px;
    color: #aaa;
    pointer-events: none;
    transition: all 0.3s ease;
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

export const SignUpButton = styled.button`
    width: 300px;
    display: flex;
    font-size: 16px;
    font-weight: bolder;
    border: none;
    border-radius: 5px;
    height: 40px;
    justify-content: center;
    align-items: center;
    align-text: center;
    flex-direction: row;
    background-color: #106FCB;
    color: #F5F5F5;
    ;
    &:hover {
        background-color: #127CE2;
        cursor: pointer;
    }
`;

export const InputInfo = styled.input`
    width: 100%;
    padding: 18px 10px 5px 10px;
    font-size: 16px;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 4px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.loginInputBackgroundColor};
    color: ${({ theme }) => theme.textColor};

    &:focus {
        outline: none;
        border-color: #777;
    }

    &:placeholder-shown + label {
        top: 19px; /* 기본 위치 */
        left: 28px;
        font-size: 16px;
        color: #aaa;
        transition: all 0.3s ease;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
        top: 12px; /* 상단으로 이동 */
        left: 25px;
        font-size: 12px; 
        color: ${({ theme }) => theme.loginInputPlaceholderColor};
        transition: all 0.3s ease;
    }

    @media all and (min-width: 359px) and (max-width: 799px) {
        width: 95%;
    }
`;

export const PasswordToggleIcon = styled.div`
    position: absolute;
    top: 55%;
    right: 30px;
    transform: translateY(-50%);
    cursor: pointer;
    
    svg {
        width: 20px;
        height: 20px;
        color: ${({ theme }) => theme.loginInputPasswordToggleIcon};
    }
`;

export const PrivacyAgreementCheckContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const PrivacyAgreementCheck = styled.input`
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    cursor: pointer;

    &:checked {
        background-color: ${({ theme }) => theme.innerbackgroundColor};
        border-color: ${({ theme }) => theme.borderColor};
        position: relative;
    }

    &:checked::after {
        content: '✔';
        font-size: 25px;
        color: ${({ theme }) => theme.iconColor};
        background-color: transparent;
        display: block;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 30%;
        left: 55%;
        transform: translate(-50%, -50%);
        line-height: 1;
    }
`;

export const PrivacyAgreementLabel = styled.label`
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.textColor};
`;

export const PrivacyAgreementToggleButton = styled.button`
    width: 25px;
    height: 25px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.innerbackgroundColor};
    border-radius: 50%;
    font-size: 20px;
    color: ${({ theme }) => theme.iconColor};
`;

export const PrivacyAgreementErrorMsgWrapper = styled.div`
    padding: 0 1rem;
    width: 100%;
    font-size: 11px;
    color: red;
    text-align: center;
    word-wrap: break-word;
`;

export const PrivacyAgreementBox = styled.div`
    position: relative;
    height: 300px;
    overflow-y: auto;
    color: ${({ theme }) => theme.textColor};
    border: 1px solid ${({ theme }) => theme.borderColor};
    padding: 1rem;
    border-radius: 5px;
    margin-top: 1rem;
    font-size: 12px;

    strong {
        color: ${({ theme }) => theme.textColor};
        font-size: 13px;
    }

    &::-webkit-scrollbar {
        width: 6px;
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
            width: 6px;
        }
    }
`