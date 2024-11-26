import { useRecoilState } from "recoil";
import { currencyKRW } from "../../../util/atoms";
import { useSidebar } from "../../../contexts/SidebarContext";
import { FaDollarSign, FaPlus, FaWonSign } from "react-icons/fa";
import Widget from "./widget/Widget";
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
            <C.SwitchContainer sidebarOpen={sidebarOpen}>
                <C.WidgetAddContainer>
                    <Text fontSize={{base: "24px", lg: "24px", sm: "18px"}} fontWeight="700">관심 종목</Text>
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
            </C.SwitchContainer>
            <C.CryptoWidgetContainer
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
            </C.CryptoWidgetContainer>
            <C.DataWidgetContainer>
                {dataWidgets.map((widget) => (
                    <DataWidget key={widget.type} widget={widget} />
                ))}
            </C.DataWidgetContainer>
            
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