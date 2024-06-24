import * as S from "./Item.styles";
import { useSidebar } from "../commons/SidebarContext";
import SideBar from "./Sidebar";
import { useRecoilState } from "recoil";
import { darkMode } from "../commons/atoms";

export default function SpotPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [isDarkMode] = useRecoilState(darkMode);

    return (
        <S.Container darkMode={isDarkMode}>
            <SideBar />
            <S.MainContent sidebarOpen={sidebarOpen} darkMode={isDarkMode}>
                <S.SpotHeader darkMode={isDarkMode}>현물</S.SpotHeader>
                {[1, 2, 3, 4].map((num) => (
                    <S.WidgetContainer key={num} darkMode={isDarkMode}>
                        <S.WidgetHeader darkMode={isDarkMode}>현물 {num}</S.WidgetHeader>
                        <S.WidgetTable darkMode={isDarkMode}>
                            <thead>
                                <tr>
                                    <S.WidgetCell className="title">코인</S.WidgetCell>
                                    <S.WidgetCell className="title">현재 포지션</S.WidgetCell>
                                    <S.WidgetCell className="title">진입가격</S.WidgetCell>
                                    <S.WidgetCell className="title">누적손익</S.WidgetCell>
                                    <S.WidgetCell className="title">승률</S.WidgetCell>
                                    <S.WidgetCell className="title">수익 팩터</S.WidgetCell>
                                    <S.WidgetCell className="title">횟수</S.WidgetCell>
                                    <S.WidgetCell className="title">평균봉수</S.WidgetCell>
                                    <S.WidgetCell className="title">평균수익</S.WidgetCell>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <S.WidgetCell>코인아이콘</S.WidgetCell>
                                    <S.WidgetCell>상승</S.WidgetCell>
                                    <S.WidgetCell>1000 KRW</S.WidgetCell>
                                    <S.WidgetCell>10.00%</S.WidgetCell>
                                    <S.WidgetCell>50.00%</S.WidgetCell>
                                    <S.WidgetCell>1.234</S.WidgetCell>
                                    <S.WidgetCell>5</S.WidgetCell>
                                    <S.WidgetCell>10</S.WidgetCell>
                                    <S.WidgetCell>5.00%</S.WidgetCell>
                                </tr>
                            </tbody>
                        </S.WidgetTable>
                    </S.WidgetContainer>
                ))}
            </S.MainContent>
        </S.Container>
    );
}