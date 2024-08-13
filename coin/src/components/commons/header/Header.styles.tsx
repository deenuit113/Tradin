import styled from "@emotion/styled";

export const HeaderContainer = styled.header<{ darkMode: boolean }>`
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    background-color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
    border: 1px solid lightgrey;
    padding: 10px 0px 10px 0px;
    z-index: 999;
    box-sizing: border-box;
`;

export const Left = styled.div`
    width: 15%;
    display: flex;
    align-items: center;
    align-text: center;
    justify-content: space-between;
    border: 1px solid blue;
    @media all and (min-width:359px) and (max-width: 799px) {
        width: 15%;
    }
`;

export const Title = styled.h1<{ darkMode: boolean }>`
    cursor: pointer;
    font-size: 25px;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};

    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 15px;
    }
`;

export const Center = styled.div`
    width: 60%;
    text-align: center;
    border: 1px solid red;

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 40%;
        margin-left: 20px;
    }
`;

export const Marquee = styled.div<{ darkMode: boolean }>`
    border-radius: 10px;
    box-shadow: 0px 0px 10px gray;
    overflow: hidden;
    white-space: nowrap;
    background-color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};

    p {
        display: inline-block;
        padding-left: 100%;
        animation: marquee 15s linear infinite;
        color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    }

    @keyframes marquee {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(-100%, 0);
        }
    }
`;

export const Right = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
    align-text: center;
    justify-content: space-between;
    margin-left: 10px;
    border: 1px solid green;
    @media all and (min-width:359px) and (max-width: 799px) {
        width: 30%;
        margin-right: 20px;
    }
`;

export const IconList = styled.ul<{ darkMode: boolean }>`
    width: 100%;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    .DarkMode-Switch{
        &:hover{
            box-shadow: ${({ darkMode }) => (darkMode ? '0px 0px 15px blue' : '0px 0px 15px lightblue')};
        }
    }
`;

export const IconListItem = styled.li`
    display: flex;
    align-items: center;
    width: 30%;
    margin: 0 0.5rem;
`;

export const ToggleButton = styled.button<{ darkMode: boolean }>`
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
    padding-top: 10px;

    .Fabars{
        color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    }
`;

export const Login = styled.p`
    font-size: 11px;
    &:hover {
        cursor: pointer;
    }
    @media all and (min-width:359px) and (max-width: 799px) {
        font-size: 7px;
    }
`