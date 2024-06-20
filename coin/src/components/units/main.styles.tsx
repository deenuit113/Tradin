import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    height: 90vh;
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
`;

export const Widget = styled.div`
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.5rem;
`;