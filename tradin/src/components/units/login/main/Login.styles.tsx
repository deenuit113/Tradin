import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    background-color: ${({ theme }) => theme.backgroundColor};
`;

export const MainContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow-y: hidden;
    flex-direction: column;

    #naverIdLogin {
        margin-bottom: 15px;
    }
`;

export const PageTitle = styled.h1`
    font-size: 40px;
    cursor: pointer;
    color: ${({ theme }) => theme.iconColor};
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 350px;
    margin-bottom: 1rem;
`

export const InputContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

    &:-webkit-autofill {
        -webkit-text-fill-color: ${({ theme }) => theme.textColor}; /* 텍스트 색상 */
        -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.loginInputBackgroundColor} inset; /* 배경색 덮어쓰기 */
        transition: background-color 5000s ease-in-out 0s;
    }

    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        -webkit-text-fill-color: ${({ theme }) => theme.textColor}; /* 텍스트 색상 */
        -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.loginInputBackgroundColor} inset; /* 배경색 덮어쓰기 */
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
    right: 28px;
    transform: translateY(-50%);
    cursor: pointer;
    
    svg {
        width: 20px;
        height: 20px;
        color: ${({ theme }) => theme.loginInputPasswordToggleIcon};
    }
`;

export const LoginInfoContainer = styled.div`
    gap: 15px;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    div {
        font-size: 12px;
        color: ${({ theme }) => theme.textColor};
        display: flex;
        flex-direction: row
        align-items: center;
    }
`

export const LoginButton = styled.button`
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
`

export const Divider = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    width: 50%;
    margin: 20px 0;

    &::before,
    &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid ${({ theme }) => theme.borderColor};
        margin: 0 10px;
    }
`;

export const DividerText = styled.span`
    font-size: 14px;
    color: #777;
`;

export const SocialLoginContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    gap: 10px;
`

export const GoogleLoginButton = styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    font-weight: bolder;
    border: 2px solid ${({ theme }) => theme.borderColor};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    align-text: center;
    flex-direction: row;
    font-size: 13px;
    background-color: ${({ theme }) => theme.backgroundColor};

    svg {
        vertical-align: middle;
        width: 25px;
        height: 25px;
        color: ${({ theme }) => theme.iconColor};
    }
    &:hover {
        background-color: ${({ theme }) => theme.moreinnerbackgroundColor};
        cursor: pointer;
    }
`

export const KakaoLoginButton = styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    font-weight: bolder;
    border: 2px solid ${({ theme }) => theme.borderColor};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    align-text: center;
    flex-direction: row;
    font-size: 13px;

    &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
`

export const KakaoLogo = styled.img`
    width: 37px;
    height: 37px;
`

export const NaverLogo = styled.img`
    width: 38px;
    height: 38px;
`

export const NaverLoginButton = styled.div`
    width: 40px;
    display: flex;
    font-weight: bolder;
    border-radius: 5px;
    height: 40px;
    justify-content: center;
    align-items: center;
    align-text: center;
    flex-direction: row;
    font-size: 13px;
    border: 2px solid ${({ theme }) => theme.borderColor};

    &:hover {
        cursor: pointer;
    }
`
export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const SignUpLabel = styled.label`
    font-size: 16px;
    color:  ${({ theme }) => theme.textColor};
`

export const SignUpButton = styled.button`
    background-color: transparent;
    color: #106FCB;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 4px;
    @media all and (min-width: 359px) and (max-width: 799px) {
        padding: 5px 10px;
    }
`;