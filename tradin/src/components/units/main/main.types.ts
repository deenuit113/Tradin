export interface IMainPageUIProps {
    widgets: { id: string; type: string; name: string }[]
    removeWidget: (index: number) => void;
    moveWidget: (dragIndex: number, hoverIndex: number) => void;
    setSelectedSymbol: React.Dispatch<React.SetStateAction<string | null>>;
    onClickWidgetSelector: () => void;
    addWidget: (widgetType: string) => void;
    setWidgetSelectorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    availableWidgetTypes: { type: string; name: string, icon: JSX.Element, symbol: string | undefined,}[]
    widgetSelectorOpen: boolean;
    selectedSymbol: string | null;
}