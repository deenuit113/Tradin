import Link from 'next/link';
import * as S from "../Item.styles";
import { useSidebar } from "../../../commons/sidebar/SidebarContext";
import SideBar from "../../../commons/sidebar/Sidebar";
import { useRecoilState } from "recoil";
import { darkMode } from "../../../commons/atoms";
import { useRouter } from 'next/router';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

type Position = '상승' | '하강';

interface CoinData {
    position: Position;
    entryPrice: string;
    profitLoss: string;
    winRate: string;
    profitFactor: string;
    trades: number;
    averageBars: number;
    averageProfit: string;
}

const coinData: CoinData[] = [
    { position: '상승', entryPrice: '1000 KRW', profitLoss: '10.00%', winRate: '50.00%', profitFactor: '1.234', trades: 5, averageBars: 10, averageProfit: '5.00%' },
];

export default function SpotPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [isDarkMode] = useRecoilState(darkMode);
    const router = useRouter();

    const onClickMoveToSpotStrategy = (id: number) => {
        router.push(`./spot/${id}`);
    };

    return (
        <S.Container darkMode={isDarkMode}>
            <SideBar />
            <S.MainContent sidebarOpen={sidebarOpen} darkMode={isDarkMode}>
                <S.SpotHeader darkMode={isDarkMode}>현물</S.SpotHeader>
                {[1, 2, 3, 4].map((num) => (
                    <S.WidgetContainer key={num} darkMode={isDarkMode}>
                        <S.WidgetHeader darkMode={isDarkMode} onClick={() => onClickMoveToSpotStrategy(num)}>현물 {num}</S.WidgetHeader>
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
                                {coinData.map((data, index) => (
                                    <tr key={index}>
                                        <S.StrategyInfo className="value" darkMode={isDarkMode}>코인아이콘</S.StrategyInfo>
                                        <S.StrategyInfo className="value" darkMode={isDarkMode}>
                                            {data.position === '상승' ? <FaCaretUp className="position-icon" color="red" /> : <FaCaretDown className="position-icon" color="blue" />}
                                        </S.StrategyInfo>
                                        <S.StrategyInfo className="value" darkMode={isDarkMode}>{data.entryPrice}</S.StrategyInfo>
                                        <S.StrategyInfo className="value" darkMode={isDarkMode}>{data.profitLoss}</S.StrategyInfo>
                                        <S.StrategyInfo className="value" darkMode={isDarkMode}>{data.winRate}</S.StrategyInfo>
                                        <S.StrategyInfo className="value" darkMode={isDarkMode}>{data.profitFactor}</S.StrategyInfo>
                                        <S.StrategyInfo className="value" darkMode={isDarkMode}>{data.trades}</S.StrategyInfo>
                                        <S.StrategyInfo className="value" darkMode={isDarkMode}>{data.averageBars}</S.StrategyInfo>
                                        <S.StrategyInfo className="value" darkMode={isDarkMode}>{data.averageProfit}</S.StrategyInfo>
                                    </tr>
                                ))}
                            </tbody>
                        </S.WidgetTable>
                    </S.WidgetContainer>
                ))}
            </S.MainContent>
        </S.Container>
    );
}