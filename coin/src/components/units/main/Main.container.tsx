import { useEffect, useState } from "react";
import { availableWidgets } from "./widget/AvailableWidgets";
import { v4 as uuidv4 } from 'uuid';
import MainPageUI from "./Main.presenter";

export default function MainPage(): JSX.Element {
    const [widgets, setWidgets] = useState<{ id: string; type: string; name: string }[]>([]);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const [widgetSelectorOpen, setWidgetSelectorOpen] = useState(false);
    
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
        <>
            <MainPageUI
                widgets={widgets}
                removeWidget={removeWidget}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                moveWidget={moveWidget}
                setSelectedSymbol={setSelectedSymbol}
                onClickWidgetSelector={onClickWidgetSelector}
                addWidget={addWidget}
                setWidgetSelectorOpen={setWidgetSelectorOpen}
                availableWidgetTypes={availableWidgetTypes}
                widgetSelectorOpen={widgetSelectorOpen}
                selectedSymbol={selectedSymbol}
            />
        </>
    );
}