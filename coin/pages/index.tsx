import styled from "@emotion/styled";

const Container = styled.div`
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Main = styled.main`
    text-align: center;
`;

export default function Home() {
    return (
        <Container>
            <Main>
                <h1>Welcome to the Project</h1>
                <p>This is the main content area.</p>
                {/* Add more content as needed */}
            </Main>
        </Container>
    );
}