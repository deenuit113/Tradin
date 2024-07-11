import { useState } from "react";
import * as S from "./Main.styles";
import { useSidebar } from "../../commons/sidebar/SidebarContext";
import SideBar from "../../commons/sidebar/Sidebar";
import { FaPlus } from "react-icons/fa";
import Widget from "../widget/Widget";
import WidgetSelector from "../widget/WidgetSelector";// 추가된 부분
import { useRecoilState } from "recoil";
import { darkMode } from "../../commons/atoms";

interface WidgetData {
    type: string;
    id: number;
}

export default function MainPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [widgets, setWidgets] = useState<WidgetData[]>([]);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);

    const addWidget = (widgetType: string) => {
        setWidgets([...widgets, { type: widgetType, id: widgets.length }]);
        setIsSelectorOpen(false);
    };

    const moveWidget = (dragIndex: number, hoverIndex: number) => {
        const updatedWidgets = [...widgets];
        const [draggedWidget] = updatedWidgets.splice(dragIndex, 1);
        updatedWidgets.splice(hoverIndex, 0, draggedWidget);
        setWidgets(updatedWidgets);
    };

    const removeWidget = (index: number) => {
        setWidgets(widgets.filter((_, i) => i !== index));
        setMenuOpen(null);
    };

    return (
        <S.Container darkMode={isDarkMode}>
            <SideBar />
            <S.MainContent sidebarOpen={sidebarOpen} darkMode={isDarkMode}>
                {widgets.map((widgetData, index) => (
                    <Widget
                        key={widgetData.id}
                        index={index}
                        widget={{
                            type: widgetData.type === 'bitcoin' ? '비트코인 가격' : widgetData.type === 'ethereum' ? '이더리움 가격' : `정보 ${index + 1}`,
                            coinId: widgetData.type
                        }}
                        removeWidget={removeWidget}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        moveWidget={moveWidget}
                    />
                ))}
                {isSelectorOpen && (
                    <WidgetSelector
                        addWidget={addWidget}
                        setIsSelectorOpen={setIsSelectorOpen}
                    />
                )}
                <S.WidgetAdd darkMode={isDarkMode}>
                    <S.AddWidgetButton darkMode={isDarkMode} onClick={() => setIsSelectorOpen(true)}>
                        <FaPlus /> 위젯 추가
                    </S.AddWidgetButton>
                </S.WidgetAdd>
            </S.MainContent>
        </S.Container>
    );
}