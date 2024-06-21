import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    height: 98vh;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const MainContent = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "90%" : "100%")};
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "18%" : "0")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    padding: 1rem;
    height: 85%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
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
        margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "38%" : "0")};
    }
`;

export const Widget = styled.div<{ isDragging: boolean }>`
    background-color: #fff;
    border: 1px solid lightgray;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 1rem;
    width: 210px;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    position: relative;
    transition: transform 0.3s ease;
    transform: ${({ isDragging }) => (isDragging ? 'scale(1.05)' : 'scale(1)')};
`;

export const WidgetAdd = styled.div`
    background-color: #fff;
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
`;

export const WidgetHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const MenuIcon = styled.div`
    cursor: pointer;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    background: white;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    right: 1rem;
    top: 2rem;
`;

export const DropdownItem = styled.div`
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

export const WidgetContent = styled.div`
    margin-top: 1rem;
`;

export const AddWidgetButton = styled.button`
    background-color: #0070f3;
    color: white;
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