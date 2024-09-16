import * as S from "../Item.styles";
import { useSidebar } from "../../../commons/sidebar/SidebarContext";
import { useRouter } from 'next/navigation';
import { FaCaretUp, FaCaretDown, FaAngleRight } from 'react-icons/fa';
import Breadcrumb from "../../../commons/breadcrumb/BreadCrumb";

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

export default function FuturePage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const router = useRouter();

    const onClickMoveToFutureStrategy = (num: number) => {
        router.push(`./future/${num}`);
    };

    return (
        <S.Container>
            <S.SpotHeader sidebarOpen={sidebarOpen}>
                <div>
                    <Breadcrumb/>
                </div>
            </S.SpotHeader>
            <S.MainContent sidebarOpen={sidebarOpen} >
                {[1, 2, 3, 4].map((num) => (
                    <S.WidgetContainer key={num} >
                        <S.WidgetHeader onClick={() => onClickMoveToFutureStrategy(num)}>선물 {num}</S.WidgetHeader>
                        <S.WidgetTable>
                            <thead>
                                <tr>
                                    <S.StrategyInfo className="title">코인</S.StrategyInfo>
                                    <S.StrategyInfo className="title">현재 포지션</S.StrategyInfo>
                                    <S.StrategyInfo className="title">진입가격</S.StrategyInfo>
                                    <S.StrategyInfo className="title">누적손익</S.StrategyInfo>
                                    <S.StrategyInfo className="title">승률</S.StrategyInfo>
                                    <S.StrategyInfo className="title">수익 팩터</S.StrategyInfo>
                                    <S.StrategyInfo className="title">횟수</S.StrategyInfo>
                                    <S.StrategyInfo className="title">평균봉수</S.StrategyInfo>
                                    <S.StrategyInfo className="title">평균수익</S.StrategyInfo>
                                </tr>
                            </thead>
                            <tbody>
                                {coinData.map((data, index) => (
                                    <tr key={index}>
                                        <S.StrategyInfo className="value">코인아이콘</S.StrategyInfo>
                                        <S.StrategyInfo className="value">
                                            {data.position === '상승' ? <FaCaretUp className="position-icon" color="red" /> : <FaCaretDown className="position-icon" color="blue" />}
                                        </S.StrategyInfo>
                                        <S.StrategyInfo className="value">{data.entryPrice}</S.StrategyInfo>
                                        <S.StrategyInfo className="value">{data.profitLoss}</S.StrategyInfo>
                                        <S.StrategyInfo className="value">{data.winRate}</S.StrategyInfo>
                                        <S.StrategyInfo className="value">{data.profitFactor}</S.StrategyInfo>
                                        <S.StrategyInfo className="value">{data.trades}</S.StrategyInfo>
                                        <S.StrategyInfo className="value">{data.averageBars}</S.StrategyInfo>
                                        <S.StrategyInfo className="value">{data.averageProfit}</S.StrategyInfo>
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