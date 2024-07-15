import { useEffect, useState } from "react";
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
    const [isDarkMode] = useRecoilState(darkMode);

    const addWidget = (widgetType: string) => {
        const widgetName = availableWidgets.find(widget => widget.type === widgetType)?.name || `정보 ${widgets.length + 1}`;
        setWidgets(prevWidgets => {
            const newWidgets = [...prevWidgets, { id: `${prevWidgets.length + 1}`, type: widgetType, name: widgetName }];
            localStorage.setItem('widgets', JSON.stringify(newWidgets));
            return newWidgets;
        });
        setWidgetSelectorOpen(false);
    };

    const moveWidget = (dragIndex: number, hoverIndex: number) => {
        setWidgets(prevWidgets => {
            const updatedWidgets = [...prevWidgets];
            const [draggedWidget] = updatedWidgets.splice(dragIndex, 1);
            updatedWidgets.splice(hoverIndex, 0, draggedWidget);
            localStorage.setItem('widgets', JSON.stringify(updatedWidgets));
            return updatedWidgets;
        });
    };

    const removeWidget = (index: number) => {
        setWidgets(prevWidgets => {
            const newWidgets = prevWidgets.filter((_, i) => i !== index);
            localStorage.setItem('widgets', JSON.stringify(newWidgets));
            return newWidgets;
        });
        setMenuOpen(null);
    };

    useEffect(() => {
        const storedWidgets = localStorage.getItem('widgets');
        if (storedWidgets) {
            try {
                const parsedWidgets = JSON.parse(storedWidgets);
                if (Array.isArray(parsedWidgets)) {
                    setWidgets(parsedWidgets);
                }
            } catch (e) {
                console.error("Failed to parse widgets from localStorage", e);
            }
        }
    }, []);

    const availableWidgetTypes = availableWidgets.filter(
        (widget) => !widgets.some((w) => w.type === widget.type)
    );

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
                    <S.AddWidgetButton onClick={() => setWidgetSelectorOpen(true)} darkMode={isDarkMode}>
                        <FaPlus />
                        위젯 추가
                    </S.AddWidgetButton>
                    {widgetSelectorOpen && (
                        <WidgetSelector
                            addWidget={addWidget}
                            setIsSelectorOpen={setWidgetSelectorOpen}
                            availableWidgets={availableWidgetTypes}
                            isOpen={widgetSelectorOpen}
                        />
                    )}
                </S.WidgetAdd>
            </S.MainContent>
        </S.Container>
    );
}