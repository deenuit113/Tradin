import { useState } from "react";
import * as S from "./Main.styles";
import { useSidebar } from "../../commons/sidebar/SidebarContext";
import SideBar from "../../commons/sidebar/Sidebar";
import { FaPlus } from "react-icons/fa";
import Widget from "../widget/Widget";
import { useRecoilState } from "recoil";
import { darkMode } from "../../commons/atoms";
import WidgetSelector from "../widget/WidgetSelector";
import { availableWidgets } from "../widget/AvailableWidgets";



export default function MainPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [widgets, setWidgets] = useState<{ id: string; type: string; name: string }[]>([]);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const [widgetSelectorOpen, setWidgetSelectorOpen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);

    const addWidget = (widgetType: string) => {
        const widgetName = availableWidgets.find(widget => widget.type === widgetType)?.name || `정보 ${widgets.length + 1}`;
        setWidgets([...widgets, { id: `${widgets.length + 1}`, type: widgetType, name: widgetName }]);
        setWidgetSelectorOpen(false); // 위젯을 추가하면 선택 창을 닫음
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
                        widget={widgetData}
                        removeWidget={removeWidget}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        moveWidget={moveWidget}
                    />
                ))}
                <S.WidgetAdd darkMode={isDarkMode}>
                    <S.AddWidgetButton onClick={() => setWidgetSelectorOpen(!widgetSelectorOpen)} darkMode={isDarkMode}>
                        <FaPlus />
                        위젯 추가
                    </S.AddWidgetButton>
                    {widgetSelectorOpen && (
                        <WidgetSelector addWidget={addWidget} setIsSelectorOpen={setWidgetSelectorOpen} />
                    )}
                </S.WidgetAdd>
            </S.MainContent>
        </S.Container>
    );
}