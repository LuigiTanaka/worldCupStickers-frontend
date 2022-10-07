import styled from "styled-components";
import StickerContainer from "./StickerContainer";

export default function CategoryContainer({ categoryName }) {
    const stickers = [{name: "QAT 1", missing: true}, {name: "QAT 2", missing: false}, {name: "QAT 3", missing: true}, {name: "QAT 4", missing: true}, {name: "QAT 5", missing: true}, {name: "QAT 6", missing: true}, {name: "QAT 7", missing: true}, {name: "QAT 8", missing: true}, {name: "QAT 9", missing: true}, {name: "QAT 10", missing: true}, {name: "QAT 11", missing: false}, {name: "QAT 12", missing: true}, {name: "QAT 13", missing: true}, {name: "QAT 14", missing: true}, {name: "QAT 15", missing: true}, {name: "QAT 16", missing: true}, {name: "QAT 17", missing: true}, {name: "QAT 18", missing: true}, {name: "QAT 19", missing: true}, {name: "QAT 20", missing: true}];

    function showStickers() {
        return (
            <>
                { stickers.map(sticker => <StickerContainer stickerName={sticker.name} missing={sticker.missing} />) }
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
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
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
    padding: 20px;
    display: grid;
    justify-content: center;
    grid-template-columns: 38px 38px 38px 38px 38px 38px 38px;
    grid-template-rows: 38px 38px 38px;
    gap: 12px;
`