import styled from "@emotion/styled";

export const Container = styled.div`
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Main = styled.main`
    text-align: center;
`;

export const MenuWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    margin: 10px 0 10px 20px;
    padding: 5px;
    padding-right: 10px;
    padding-left: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    background: rgba(255, 255, 255, 0.7);
    z-index: 1;
    font-size: 18px;
    border: 5px solid #b7f0b1;
    border-radius: 10px;
    resize: horizontal; /* 수평 리사이즈만 허용 */
    min-width: 200px; /* 최소 너비 설정 */

    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;

    div {
        font-size: 18px; 
        font-weight: bold;
        margin-bottom: 10px;
    }
    
    span{
        font-size: 12px;
    }

    .option{
        text-align: center;
    }

    &.close {
        display: none;
    }

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

    @media all and (min-width: 359px) and (max-width: 799px) {
        // 모바일 세로
        position: relative;
        width: 95%;
        min-width: 95%;
        height: 70%;
        margin: 10px 10px 10px 10px;
        max-height: 80vh; /* 최대 높이 설정 */
        div {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        span{
            font-size: 11px;
        }

        &.close {
            display: block;
        }
    }
`;