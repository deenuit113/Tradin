import styled from "@emotion/styled";

export const Container = styled.div<{ $darkMode: boolean }>`
    display: flex;
    width: 100%;
    height: 90vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${({ $darkMode: darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
`;

export const CurrencyToggleContainer = styled.div<{ sidebarOpen: boolean }>`
    display: flex;
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    align-items: center;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0%")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    justify-content: flex-end;
    padding: 5px 10px;
`;

export const CurrencyToggleButton = styled.button<{ active: boolean }>`
    background-color: ${({ active }) => (active ? '#0070f3' : '#ccc')};
    color: ${({ active }) => (active ? '#fff' : '#333')};
    border: none;
    border-radius: 20px;
    padding: 5px 15px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ active }) => (active ? '#005bb5' : '#bbb')};
    }

    &:first-of-type {
        margin-right: 5px;
    }
`;

export const MainContent = styled.div<{ sidebarOpen: boolean, $darkMode: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0%")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    padding: 1rem;
    height: 100%;
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

export const Widget = styled.div<{ isDragging: boolean, $darkMode: boolean }>`
    background-color: ${({ $darkMode: darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
    border: 1px solid lightgray;
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 15px 15px 15px 15px;
    width: 210px;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    position: relative;
    transition: transform 0.3s ease;
    transform: ${({ isDragging }) => (isDragging ? 'scale(1.05)' : 'scale(1)')};

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 190px;
        height: 180px;
    }
`;

export const CoinTimeStamp = styled.p`
    color: gray;
    font-size: 11px;
    margin-top: 20px;

    @media all and (min-width:359px) and (max-width: 799px) {
        margin-top: 10px;
    }
`

export const WidgetAdd = styled.div<{ $darkMode: boolean }>`
    background-color: ${({ $darkMode: darkMode }) => (darkMode ? '#fff' : '#a0a0a0')};
    border: 1px solid lightgray;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 1rem;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    position: relative;
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.5);

    @media all and (min-width:359px) and (max-width: 799px) {
        width: 190px;
        height: 180px;
    }
`;

export const WidgetHeader = styled.div<{ $darkMode: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: ${({ $darkMode: darkMode }) => (darkMode ? '#333' : '#ffffff')};
    @media all and (min-width:359px) and (max-width: 799px) {
        padding: 3px;
    }
`;

export const MenuIcon = styled.div<{ $darkMode: boolean }>`
    cursor: pointer;

    .MenuIcon {
        color: ${({ $darkMode: darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    }
`;

export const DropdownMenu = styled.div<{ $darkMode: boolean }>`
    position: absolute;
    background-color: ${({ $darkMode: darkMode }) => (darkMode ? '#f0f0f0' : '#333')};
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid lightgray;
    border-radius: 8px;
    right: 1rem;
    top: 2rem;
`;

export const DropdownItem = styled.div<{ $darkMode: boolean }>`
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: ${({ $darkMode: darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    
    &:hover {
        background-color: ${({ $darkMode: darkMode }) => (darkMode ? '#d0d0d0' : '#555')};
        border-radius: 8px;
    }
`;

export const WidgetContent = styled.div<{ $darkMode: boolean }>`
    margin-top: 0.5rem;
    color: ${({ $darkMode: darkMode }) => (darkMode ? '#333' : '#ffffff')};
`;

export const AddWidgetButton = styled.button<{ $darkMode: boolean }>`
    background-color: ${({ $darkMode: darkMode }) => (darkMode ? '#0070f3' : '#333')};
    color: ${({ $darkMode: darkMode }) => (darkMode ? '#f0f0f0' : '#f0f0f0')};
    border: none;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1;
`;