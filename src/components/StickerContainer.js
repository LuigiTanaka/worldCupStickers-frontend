import { useContext } from "react";
import styled from "styled-components"
import UserContext from "../contexts/UserContext";

export default function StickerContainer({ stickerName, quantity }) {
    const { disable, setDisable } = useContext(UserContext);
    
    return (
        <Container quantity={quantity}>
            <h4>{stickerName}</h4>
        </Container>
    );
}

const Container = styled.div`
    text-align: center;
    box-shadow: 1px 1px 1px 1.5px rgba(0, 0, 0, 0.25);
    background-color: ${props => props.quantity ? "#6B1B1A" : "#FFFFFF"};
    padding: 0 4px;

    h4 {
        font-size: 18px;
        font-weight: 700;
        color: ${props => props.quantity ? "#FFFFFF" : "#6B1B1A"};
    }
`