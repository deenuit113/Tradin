import styled from "@emotion/styled";

export const Container = styled.div<{ $darkMode: boolean }>`
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: ${({ $darkMode: darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
`;

export const MainContent = styled.div<{ sidebarOpen: boolean, $darkMode: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    padding: 1rem;
    height: 90%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color:  ${({ $darkMode: darkMode }) => (darkMode ? '#888' : '#f0f0f0')};
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

    @media all and (min-width:359px) and (max-width: 799px) {
        margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    }
`;

export const LoginButton = styled.button`
    font-weight: bolder;
    padding: 10px;
    border-radius: 10px;
    svg {
        vertical-align: middle;
    }
    &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
`