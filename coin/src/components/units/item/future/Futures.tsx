import * as S from "../Item.styles";
import { useSidebar } from "../../../commons/sidebar/SidebarContext";
import { useRouter } from "next/navigation";

export default function FuturesPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const router = useRouter();

    const onClickMoveToFutureStrategy = (id: number) => {
        router.push(`./future/${id}`);
    };

    return (
        <S.Container>
            <S.MainContent sidebarOpen={sidebarOpen} >
                <S.SpotHeader>선물</S.SpotHeader>
                {[1, 2, 3, 4].map((num) => (
                    <S.WidgetContainer key={num} >
                        <S.WidgetHeader onClick={() => onClickMoveToFutureStrategy(num)}>선물 {num}</S.WidgetHeader>
                        <S.WidgetTable >
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
                                <tr>
                                    <S.StrategyInfo className="value">코인아이콘</S.StrategyInfo>
                                    <S.StrategyInfo className="value">상승</S.StrategyInfo>
                                    <S.StrategyInfo className="value">1000 KRW</S.StrategyInfo>
                                    <S.StrategyInfo className="value">10.00%</S.StrategyInfo>
                                    <S.StrategyInfo className="value">50.00%</S.StrategyInfo>
                                    <S.StrategyInfo className="value">1.234</S.StrategyInfo>
                                    <S.StrategyInfo className="value">5</S.StrategyInfo>
                                    <S.StrategyInfo className="value">10</S.StrategyInfo>
                                    <S.StrategyInfo className="value">5.00%</S.StrategyInfo>
                                </tr>
                            </tbody>
                        </S.WidgetTable>
                    </S.WidgetContainer>
                ))}
            </S.MainContent>
        </S.Container>
    );
}