import { useEffect, useState } from "react";
import * as S from "./Main.styles";
import { useSidebar } from "../../commons/sidebar/SidebarContext";
import { FaPlus } from "react-icons/fa";
import Widget from "../widget/Widget";
import { useRecoilState } from "recoil";
import { darkMode } from "../../commons/atoms";
import WidgetSelector from "../widget/WidgetSelector";
import { availableWidgets } from "../widget/AvailableWidgets";
import ChartPopup from "../chart/Chart";
import { v4 as uuidv4 } from 'uuid';

export default function MainPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [widgets, setWidgets] = useState<{ id: string; type: string; name: string }[]>([]);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const [widgetSelectorOpen, setWidgetSelectorOpen] = useState(false);
    const [isDarkMode] = useRecoilState(darkMode);
    const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

    const addWidget = (widgetType: string) => {
        const widgetName = availableWidgets.find(widget => widget.type === widgetType)?.name || `정보 ${widgets.length + 1}`;
        setWidgets(prevWidgets => {
            const newId = uuidv4(); // 고유한 ID 생성
            const newWidgets = [...prevWidgets, { id: newId, type: widgetType, name: widgetName }];
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
                    const uniqueWidgets = parsedWidgets.map(widget => ({
                        ...widget,
                        id: widget.id || uuidv4() // 고유한 ID가 없으면 새로 생성
                    }));
                    setWidgets(uniqueWidgets);
                }
            } catch (e) {
                console.error("Failed to parse widgets from localStorage", e);
            }
        }
    }, []);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedSymbol(null);
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const availableWidgetTypes = availableWidgets.filter(
        (widget) => !widgets.some((w) => w.type === widget.type)
    );

    const onClickWidgetSelector = (): void => {
        setWidgetSelectorOpen(prev => !prev);
    }

    return (
        <S.Container $darkMode={isDarkMode}>
            <S.MainContent sidebarOpen={sidebarOpen} $darkMode={isDarkMode}>
                {widgets.map((widgetData, index) => (
                    <Widget
                        key={widgetData.id} // 고유한 key 값으로 id 사용
                        index={index}
                        widget={widgetData}
                        removeWidget={removeWidget}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        moveWidget={moveWidget}
                        onClickWidget={(symbol) => setSelectedSymbol(symbol)}
                    />
                ))}
                <S.WidgetAdd $darkMode={isDarkMode}>
                    <S.AddWidgetButton onClick={onClickWidgetSelector} $darkMode={isDarkMode}>
                        <FaPlus />
                        위젯 추가
                    </S.AddWidgetButton>
                    <WidgetSelector
                        addWidget={addWidget}
                        setIsSelectorOpen={setWidgetSelectorOpen}
                        availableWidgets={availableWidgetTypes}
                        isOpen={widgetSelectorOpen}
                    />
                </S.WidgetAdd>
                {selectedSymbol && (
                    <ChartPopup
                        symbol={selectedSymbol}
                        onClose={() => setSelectedSymbol(null)}
                        $darkMode={isDarkMode}
                    />
                )}
            </S.MainContent>
        </S.Container>
    );
}