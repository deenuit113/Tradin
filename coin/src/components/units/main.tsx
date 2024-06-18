import * as S from "./Main.styles";

export default function MainPage(): JSX.Element {
    return (
        <S.Container>
            <S.Sidebar>
                <S.Menu>
                    <S.MenuItem>
                        현물
                        <S.SubMenu>
                            <li>현물 1</li>
                            <li>현물 2</li>
                            <li>현물 3</li>
                            <li>현물 4</li>
                        </S.SubMenu>
                    </S.MenuItem>
                    <S.MenuItem>
                        선물
                        <S.SubMenu>
                            <li>선물 1</li>
                            <li>선물 2</li>
                            <li>선물 3</li>
                            <li>선물 4</li>
                        </S.SubMenu>
                    </S.MenuItem>
                </S.Menu>
            </S.Sidebar>
            <S.MainContent>
                <h1>Welcome to the Project</h1>
                <p>This is the main content area.</p>
                {/* Add more content as needed */}
            </S.MainContent>
        </S.Container>
    );
}