import styled from "styled-components";
import StickerContainer from "./StickerContainer";

export default function CategoryContainer({ categoryName }) {
    const stickers = [{name: "QAT 1"}, {name: "QAT 2"}, {name: "QAT 3"}, {name: "QAT 4"}, {name: "QAT 5"}, {name: "QAT 6"}, {name: "QAT 7"}, {name: "QAT 8"}, {name: "QAT 9"}];

    function showStickers() {
        return (
            <>
                { stickers.map(sticker => <StickerContainer stickerName={sticker.name} />) }
            </>
        );
    }

    const stickersContainer = showStickers();

    return (
        <Container>
            <Title>
                <h1>{categoryName}</h1>
                <h2>{`5% (2/80)`}</h2>
            </Title>
            <StickersContainer>
                {stickersContainer}
            </StickersContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    background-color: #FFFFFF;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    width: 100%;
    height: 40px;
    background-color: #5BD0B8;
    border-radius: 8px 8px 0 0;
    padding-left: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;

    h1 {
        font-size: 24px;
        font-weight: 800;
    }

    h2 {
        font-size: 18px;
        font-weight: 500;
    }
`

const StickersContainer = styled.div`
    padding: 10px;
    display: grid;
    justify-content: center;
    grid-template-columns: 30px 30px 30px 30px 30px 30px 30px;
    grid-template-rows: 24px 24px 24px;
    row-gap: 30px;
    column-gap: 20px;
`