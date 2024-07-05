import Link from 'next/link';
import * as S from "../Item.styles";
import { useSidebar } from "../../../commons/sidebar/SidebarContext";
import SideBar from "../../../commons/sidebar/Sidebar";
import { useRecoilState } from "recoil";
import { darkMode } from "../../../commons/atoms";
import { useRouter } from 'next/router';

export default function SpotPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [isDarkMode] = useRecoilState(darkMode);
    const router = useRouter();

    const onClickMoveToStrategy = (id: number) => {
        router.push(`./spot/${id}`);
    };


    return (
        <S.Container darkMode={isDarkMode}>
            <SideBar />
            <S.MainContent sidebarOpen={sidebarOpen} darkMode={isDarkMode}>
                <S.SpotHeader darkMode={isDarkMode}>현물</S.SpotHeader>
                {[1, 2, 3, 4].map((num) => (
                    <S.WidgetContainer key={num} darkMode={isDarkMode}>
                        <S.WidgetHeader darkMode={isDarkMode} onClick={() => onClickMoveToStrategy(num)}>현물 {num}</S.WidgetHeader>
                        <S.WidgetTable darkMode={isDarkMode}>
                            <thead>
                                <tr>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>코인</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>현재 포지션</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>진입가격</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>누적손익</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>승률</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>수익 팩터</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>횟수</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>평균봉수</S.StrategyInfo>
                                    <S.StrategyInfo className="title" darkMode={isDarkMode}>평균수익</S.StrategyInfo>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>코인아이콘</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>상승</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>1000 KRW</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>10.00%</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>50.00%</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>1.234</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>5</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>10</S.StrategyInfo>
                                    <S.StrategyInfo className="value" darkMode={isDarkMode}>5.00%</S.StrategyInfo>
                                </tr>
                            </tbody>
                        </S.WidgetTable>
                    </S.WidgetContainer>
                ))}
            </S.MainContent>
        </S.Container>
    );
}