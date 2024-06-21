import styled from "@emotion/styled";

export const HeaderContainer = styled.header<{ darkMode: boolean }>`
    position: fixed;
    width: 94%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    background-color: ${({ darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
    box-shadow: 0px 0px 10px gray;
    border-radius: 10px 10px 10px 10px;
    z-index: 1000;
    box-sizing: border-box;
    margin-left: 3%;
    margin-right: 3%;
`;

export const Left = styled.div`
    width: 13%;
    height: 100%;
    display: flex;
    align-items: center;
    align-text: center;
    justify-content: center;
`;

export const Title = styled.h1<{ darkMode: boolean }>`
    cursor: pointer;
    font-size: 25px;
    color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
`;

export const Center = styled.div`
    width: 60%;
    text-align: center;
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
    width: 15%;
    display: flex;
    align-items: center;
`;

export const IconList = styled.ul`
    width: 100%;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const IconListItem = styled.li`
    width: 30%;
    margin: 0 0.5rem;
`;

export const ToggleButton = styled.button<{ darkMode: boolean }>`
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
    margin-right: 1rem;
    padding-top: 10px;

    .Fabars{
        color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    }
`;