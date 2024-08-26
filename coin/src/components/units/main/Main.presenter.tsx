import * as S from "./Main.styles";
import { useRecoilState } from "recoil";
import { darkMode } from "../../commons/atoms";
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

export default function MainPageUI(props: IMainPageUIProps): JSX.Element {
    const [isDarkMode] = useRecoilState(darkMode);
    const { sidebarOpen } = useSidebar();

    return (
        <>
            <S.Container $darkMode={isDarkMode}>
                <S.CurrencyToggleContainer sidebarOpen={sidebarOpen}>
                    <Switch
                            onChange={() => props.setIsCurrencyKRW(prev => !prev)}
                            checked={props.isCurrencyKRW}
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
                <S.MainContent sidebarOpen={sidebarOpen} $darkMode={isDarkMode}>
                    {props.widgets.map((widgetData, index) => (
                        <Widget
                            key={widgetData.id} // 고유한 key 값으로 id 사용
                            index={index}
                            widget={widgetData}
                            removeWidget={props.removeWidget}
                            menuOpen={props.menuOpen}
                            setMenuOpen={props.setMenuOpen}
                            moveWidget={props.moveWidget}
                            onClickWidget={(symbol) => props.setSelectedSymbol(symbol)}
                            isCurrencyKRW={props.isCurrencyKRW}
                            exchangeRate={props.exchangeRate}
                        />
                    ))}
                    <S.WidgetAdd $darkMode={isDarkMode}>
                        <S.AddWidgetButton onClick={props.onClickWidgetSelector} $darkMode={isDarkMode}>
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
                            $darkMode={isDarkMode}
                        />
                    )}
                </S.MainContent>
            </S.Container>
        </>
    );
}