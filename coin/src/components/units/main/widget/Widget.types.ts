export interface IWidgetProps {
    widget: { id: string; type: string; name: string };
    index: number;
    menuOpen: number | null;
    setMenuOpen: (index: number | null) => void;
    removeWidget: (index: number) => void;
    moveWidget: (dragIndex: number, hoverIndex: number) => void;
    onClickWidget: (symbol: string) => void;
    isCurrencyKRW: boolean;
    exchangeRate: number | null;
}