import styled from "styled-components"

export default function GroupContainer() {
    return (
        <Container>
            <Title>
                <h1>{`GROUP A`}</h1>
                <h2>{`5% (2/80)`}</h2>
            </Title>
        </Container>
    );
}

const Container = styled.div`
    width: 860px;
    height: fit-content;
    display: flex;
    background-color: #F0F0E4;
    border-radius: 8px;
    display: flex;
`

const Title = styled.div`
    width: 100%;
    height: 60px;
    background-color: #5BD0B8;
    border-radius: 8px 8px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    h1 {
        font-size: 30px;
        font-weight: 800;
    }

    h2 {
        font-size: 18px;
        font-weight: 500;
    }
`