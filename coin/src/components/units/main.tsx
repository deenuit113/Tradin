import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as S from "./Main.styles";
import { useSidebar } from "../commons/SidebarContext";
import SideBar from "./Sidebar";
import { FaPlus } from "react-icons/fa";
import Widget from "./Widget"; // Ensure Widget is correctly imported

export default function MainPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [widgets, setWidgets] = useState<string[]>([]);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);

    const addWidget = () => {
        setWidgets([...widgets, `정보 ${widgets.length + 1}`]);
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
        <DndProvider backend={HTML5Backend}>
            <S.Container>
                <SideBar />
                <S.MainContent sidebarOpen={sidebarOpen}>
                    {widgets.map((widget, index) => (
                        <Widget
                            key={index}
                            index={index}
                            widget={widget}
                            removeWidget={removeWidget}
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                            moveWidget={moveWidget}
                        />
                    ))}
                    <S.Widget>
                        <S.AddWidgetButton onClick={addWidget}>
                            <FaPlus />
                            위젯 추가
                        </S.AddWidgetButton>
                    </S.Widget>
                </S.MainContent>
            </S.Container>
        </DndProvider>
    );
}