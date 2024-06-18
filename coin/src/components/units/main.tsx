import * as S from "./main.styles"

export default function MainPage(): JSX.Element {
    return (
        <S.Container>
            <S.Main>
                <h1>Welcome to the Project</h1>
                <p>This is the main content area.</p>
                {/* Add more content as needed */}
            </S.Main>
        </S.Container>
    );
}