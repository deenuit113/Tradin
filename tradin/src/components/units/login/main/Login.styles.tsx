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
    cursor: pointer;
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
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
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;

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
        color: #777;
        transition: all 0.3s ease;
    }

    @media all and (min-width: 359px) and (max-width: 799px) {
        width: 95%;
    }
`;

export const LoginButton = styled.button`
    width: 270px;
    display: flex;
    font-weight: bolder;
    padding: 10px 20px 10px 10px;
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

export const GoogleLoginButton = styled.button`
    width: 230px;
    display: flex;
    font-weight: bolder;
    padding: 10px 20px 10px 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    align-text: center;
    flex-direction: row;
    font-size: 13px;

    svg {
        vertical-align: middle;
    }
    &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
`

export const KakaoLoginButton = styled.button`
    width: 230px;
    display: flex;
    font-weight: bolder;
    padding: 10px 20px 10px 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    align-text: center;
    flex-direction: row;
    font-size: 13px;

    &:hover {
        background-color: #f5f5f5;
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