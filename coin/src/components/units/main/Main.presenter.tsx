import * as S from "./Main.styles";
import { useRecoilState } from "recoil";
import { currencyKRW } from "../../commons/atoms";
import { useSidebar } from "../../commons/sidebar/SidebarContext";
import { FaPlus } from "react-icons/fa";
import Widget from "./widget/Widget";
import WidgetSelector from "./widget/WidgetSelector";
import ChartPopup from "./chart/Chart";
import { IMainPageUIProps } from "./main.types";
import Switch from 'react-switch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWon } from "@fortawesome/free-solid-svg-icons";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { useExchangeRate } from "../../../hooks/useExchangeRate";

export default function MainPageUI(props: IMainPageUIProps): JSX.Element {
    const [isCurrencyKRW, setIsCurrencyKRW] = useRecoilState(currencyKRW);
    const { sidebarOpen } = useSidebar();

    const { exchangeRate, timestamp } = useExchangeRate();
    console.log('timestamp:',timestamp);

    const handleWidgetClick = (symbol: string | undefined) => {
        if (symbol) {
            props.setSelectedSymbol(symbol);  // symbol이 undefined가 아닌 경우에만 setSelectedSymbol 호출
        }
    };

    return (
        <>
            <S.Container>
                <S.CurrencyToggleContainer sidebarOpen={sidebarOpen}>
                    <p>
                        {exchangeRate}&nbsp;KRW/USD
                        {timestamp && <sub>{new Date(timestamp).toLocaleString()}</sub>}
                    </p>
                    <Switch
                            onChange={() => setIsCurrencyKRW(prev => !prev)}
                            checked={isCurrencyKRW}
                            offColor="#add836"
                            onColor="#add836"
                            uncheckedIcon={<FontAwesomeIcon icon={faWon} style={{ color: 'green', padding: '3.5px', paddingTop:'6px', fontSize: '14px'}} />}
                            checkedIcon={<FontAwesomeIcon icon={faDollar} style={{ color: 'green', padding: '6px', fontSize: '15px'}} />}
                            height={30}
                            width={50}
                            aria-label="coin-price-currency-unit"
                            role="switch"
                            className="Currency-Unit-Switch"
                        />
                </S.CurrencyToggleContainer>
                <S.WidgetGridContainer sidebarOpen={sidebarOpen}>
                    {props.widgets.map((widgetData, index) => {
                        const widgetConfig = props.availableWidgetTypes.find(w => w.type === widgetData.type);

                        return (
                            <Widget
                                key={widgetData.id}
                                index={index}
                                widget={widgetData}
                                removeWidget={props.removeWidget}
                                menuOpen={props.menuOpen}
                                setMenuOpen={props.setMenuOpen}
                                moveWidget={props.moveWidget}
                                onClickWidget={handleWidgetClick}
                                isCurrencyKRW={isCurrencyKRW}
                                exchangeRate={props.exchangeRate}
                            />
                        );
                    })}
                    <S.WidgetAdd>
                        <S.AddWidgetButton onClick={props.onClickWidgetSelector}>
                            <FaPlus />
                            위젯 추가
                        </S.AddWidgetButton>
                        <WidgetSelector
                            addWidget={props.addWidget}
                            setIsSelectorOpen={props.setWidgetSelectorOpen}
                            availableWidgets={props.availableWidgetTypes}
                            isOpen={props.widgetSelectorOpen}
                        />
                    </S.WidgetAdd>
                    {props.selectedSymbol && (
                        <ChartPopup
                            symbol={props.selectedSymbol}
                            onClose={() => props.setSelectedSymbol(null)}
                        />
                    )}
                </S.WidgetGridContainer>
            </S.Container>
        </>
    );
}