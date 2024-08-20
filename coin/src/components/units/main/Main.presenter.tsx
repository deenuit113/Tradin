import * as S from "./Main.styles";
import { useRecoilState } from "recoil";
import { darkMode } from "../../commons/atoms";
import { useSidebar } from "../../commons/sidebar/SidebarContext";
import { FaPlus } from "react-icons/fa";
import Widget from "./widget/Widget";
import WidgetSelector from "./widget/WidgetSelector";
import ChartPopup from "./chart/Chart";
import { IMainPageUIProps } from "./main.types";

export default function MainPageUI(props: IMainPageUIProps): JSX.Element {
    const [isDarkMode] = useRecoilState(darkMode);
    const { sidebarOpen } = useSidebar();

    return (
        <>
            <S.Container $darkMode={isDarkMode}>
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