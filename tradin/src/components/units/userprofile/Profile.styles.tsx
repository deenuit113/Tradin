import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.backgroundColor};
`;

export const ProfileHeader = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bolder;
    color: ${({ theme }) => theme.textColor};
    padding: 0rem 1rem;
    background-color: ${({ theme }) => theme.breadcrumbBackgroundColor};
    transition: width 0.3s ease, margin-left 0.3s ease;
    
    .FaAngleRight{
        margin-left: 10px;
    }

    @media (max-width: 799px) {
        height: 8%;
    }
`;

export const MainContent = styled.div<{ sidebarOpen: boolean }>`
    width: ${({ sidebarOpen }) => (sidebarOpen ? "85%" : "100%")};
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "15%" : "0")};
    transition: width 0.3s ease, margin-left 0.3s ease;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 2rem;
    box-sizing: border-box;
    gap: 20px;

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

    @media (max-width: 799px) {
        padding: 0.5rem;
    }
`;

export const UserImg = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.borderColor};
    border-radius: 50%;

    @media (max-width: 799px) {
        width: 75px;
        height: 75px;
    }
`

export const SignOutButton = styled.button`
    background-color: transparent;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    padding: 0.5rem 1rem;

    @media (max-width: 799px) {
        padding: 0.3rem 0.6rem;
    }
`

export const UserInfoContainer = styled.div`
    width: 15%;
    display: flex;
    flex-direction: row;
    align-items: flex start;
    justify-content: flex-start;
    
    @media (max-width: 799px) {
        width: 35%;
    }
`

export const UserInfoTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-weight: 700;
    flex-grow: 1;
`

export const UserInfoTitle = styled.label`
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    color: ${({ theme }) => theme.textColor};
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1rem;
`
export const UserInfoDataContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

export const UserInfoData = styled.label`
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    color: ${({ theme }) => theme.textColor};
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 0.8rem;
`
