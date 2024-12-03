import { useRecoilState } from "recoil";
import { currencyKRW } from "../../../util/atoms";
import { useSidebar } from "../../../contexts/SidebarContext";
import { FaDollarSign, FaPlus, FaWonSign } from "react-icons/fa";
import Widget from "./widget/CryptoWidget/CryptoWidget";
import WidgetSelector from "./widget/WidgetSelector";
import ChartPopup from "./chart/Chart";
import { IMainPageUIProps } from "./main.types";
import { useExchangeRate } from "../../../hooks/useExchangeRate";
import { Switch } from "@/components/ui/switch";
import { Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { useId } from "react";
import * as C from "./styles/components/Main.components"
import { dataWidgets } from "./widget/AvailableWidgets";
import DataWidget from "./widget/DataWidget";
import mockNewsData from "./widget/NewsWidget/mockNewsData";
import NewsWidgetContent from "./widget/NewsWidget/NewsWidgetContent";

export default function MainPageUI(props: IMainPageUIProps): JSX.Element {
    const [isCurrencyKRW, setIsCurrencyKRW] = useRecoilState(currencyKRW);
    const { sidebarOpen } = useSidebar();
    const id = useId();

    const { exchangeRate, timestamp } = useExchangeRate();

    const handleWidgetClick = (symbol: string | undefined) => {
        if (symbol) {
            props.setSelectedSymbol(symbol);  // symbol이 undefined가 아닌 경우에만 setSelectedSymbol 호출
        }
    };

    return (
        <C.Container sidebarOpen={sidebarOpen}>
            {/* 코인 위젯 */}
            <C.WidgetContainer>
                <C.WidgetContainerHeader>
                    <C.WidgetAddContainer>
                        <Text fontSize={{base: "20px", lg: "20px", sm: "16px"}} fontWeight="700">관심 종목</Text>
                        <C.WidgetAddBtn onClick={props.onClickWidgetSelector}>
                            <FaPlus className="PlusIcon"/>
                        </C.WidgetAddBtn> 
                    </C.WidgetAddContainer>
                    <Tooltip 
                        ids={{ trigger: id }} 
                        content={timestamp ? new Date(timestamp).toLocaleString() : ''}
                        openDelay={300}
                        closeDelay={100}
                        showArrow
                    >
                        <Switch
                            colorPalette="blue"
                            onCheckedChange={() => setIsCurrencyKRW(prev => !prev)}
                            ids = {{ root: id }}
                            size="md"
                            thumbLabel={{
                                on: (
                                    <FaDollarSign />
                                ),
                                off: (
                                    <FaWonSign/>
                                )
                            }}
                        >
                            <Text fontWeight="700">{exchangeRate}&nbsp;KRW/USD</Text>
                        </Switch>
                    </Tooltip>
                </C.WidgetContainerHeader>
                <C.CryptoWidgetBox
                    onWheel={(e) => {
                    e.currentTarget.scrollLeft += e.deltaY;
                }}>
                    {props.widgets.map((widgetData, index) => {
                        return (
                            <Widget
                                key={widgetData.id}
                                index={index}
                                widget={widgetData}
                                removeWidget={props.removeWidget}
                                moveWidget={props.moveWidget}
                                onClickWidget={handleWidgetClick}
                                isCurrencyKRW={isCurrencyKRW}
                            />
                        );
                    })}
                </C.CryptoWidgetBox>
            </C.WidgetContainer>
            {/* 정보 위젯 & 뉴스 위젯 */}
            <C.RowBox>

                {/* 정보 위젯 */}
                <C.WidgetContainer width={{base: "30%", lg: "30%", sm: "50%"}}>
                    <C.WidgetContainerHeader>
                        <Text fontSize={{base: "20px", lg: "20px", sm: "16px"}} fontWeight="700">
                            실시간 선물 기반 비트코인 정보
                        </Text>
                    </C.WidgetContainerHeader>
                    <C.DataWidgetBox>
                        {dataWidgets.map((widget) => (
                            <DataWidget key={widget.type} widget={widget} />
                        ))}
                    </C.DataWidgetBox>
                </C.WidgetContainer>

                {/* 뉴스 위젯 */}
                <C.WidgetContainer width={{base: "70%", lg: "70%", sm: "50%"}}>
                    <C.WidgetContainerHeader>
                        <Text fontSize={{base: "20px", lg: "20px", sm: "16px"}} fontWeight="700">
                            주요 뉴스
                        </Text>
                        <Text
                            fontSize={{base: "16px", lg: "16px", sm: "14px"}}
                            fontWeight="500"
                            color="lightgrey"
                            cursor="pointer"
                        >
                            더보기
                        </Text>
                    </C.WidgetContainerHeader>
                    <C.NewsBox
                        onWheel={(e) => {
                            e.currentTarget.scrollLeft += e.deltaY;
                        }}
                    >
                        {mockNewsData.map(news => (
                            <NewsWidgetContent key={news.id} news={news} />
                        ))}
                    </C.NewsBox>
                </C.WidgetContainer>
            </C.RowBox>
            {/* <C.RowBox height="200px" border="1px solid red"></C.RowBox>
            <C.RowBox height="200px" border="1px solid red"></C.RowBox>
            <C.RowBox height="200px" border="1px solid red"></C.RowBox>
            <C.RowBox height="200px" border="1px solid red"></C.RowBox>
            <C.RowBox height="200px" border="1px solid red"></C.RowBox> */}
            <WidgetSelector
                    addWidget={props.addWidget}
                    widgetSelectorOpen={props.widgetSelectorOpen}
                    availableWidgets={props.availableWidgetTypes}
                    onClose={() => props.setWidgetSelectorOpen(false)}
            />
            {props.selectedSymbol && (
                <ChartPopup
                    symbol={props.selectedSymbol}
                    onClose={() => props.setSelectedSymbol(null)}
                />
            )}
        </C.Container>
    );
}