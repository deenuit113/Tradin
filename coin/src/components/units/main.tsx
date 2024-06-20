import { useState } from "react";
import * as S from "./Main.styles";
import { useSidebar } from "../commons/SidebarContext";
import SideBar from "./Sidebar";
import { FaPlus, FaEllipsisV } from "react-icons/fa";

const initialWidgets = ["정보 1", "정보 2"];

export default function MainPage(): JSX.Element {
    const { sidebarOpen } = useSidebar();
    const [widgets, setWidgets] = useState<string[]>(initialWidgets);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);

    const addWidget = () => {
        setWidgets([...widgets, `정보 ${widgets.length + 1}`]);
    };

    const removeWidget = (index: number) => {
        setWidgets(widgets.filter((_, i) => i !== index));
        setMenuOpen(null);
    };

    return (
        <S.Container>
            <SideBar />
            <S.MainContent sidebarOpen={sidebarOpen}>
                {widgets.map((widget, index) => (
                    <S.Widget key={index}>
                        <S.WidgetHeader>
                            {widget}
                            <S.MenuIcon onClick={() => setMenuOpen(index === menuOpen ? null : index)}>
                                <FaEllipsisV />
                            </S.MenuIcon>
                            {menuOpen === index && (
                                <S.DropdownMenu>
                                    <S.DropdownItem onClick={() => removeWidget(index)}>위젯 삭제</S.DropdownItem>
                                </S.DropdownMenu>
                            )}
                        </S.WidgetHeader>
                        <S.WidgetContent>
                            {widget} 내용
                        </S.WidgetContent>
                    </S.Widget>
                ))}
                <S.Widget>
                    <S.AddWidgetButton onClick={addWidget}>
                        <FaPlus />
                        위젯 추가
                    </S.AddWidgetButton>
                </S.Widget>
            </S.MainContent>
        </S.Container>
    );
}