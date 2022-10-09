import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import album from "../assets/images/album.jpg"

export default function GeneralFramework() {
    const { user } = useContext(UserContext);

    const total = 678;
    const missing = 610;
    const repeated = 20;

    return (
        <Container>
            <LeftSide>
                <h2>{`${user.userData.username.toUpperCase()}'s ALBUM`}</h2>
                <img src={album} alt="album"/>
            </LeftSide>
            <RightSide>
                <Porcentage>
                    <h3>{`10% (68/678)`}</h3>
                </Porcentage>
                <Data>
                    <div>
                        <h4><strong>Total in the album: </strong>{total}</h4>
                        <h4><strong>Total you have: </strong>{total-missing}</h4>
                    </div>
                    <div>
                        <h4><strong>Total missing: </strong>{missing}</h4>
                        <h4><strong>Total repeated: </strong>{repeated}</h4>
                    </div>
                </Data>
            </RightSide>
        </Container>
    );
}

const Container = styled.div`
    width: 860px;
    height: 200px;
    padding: 20px;
    display: flex;
    background-color: #F0F0E4;
    box-shadow: 5px 5px 5px 3px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    justify-content: space-between;

    @media(max-width: 992px) {
        width: 600px;
        height: 180px;
    }

    @media(max-width: 700px) {
        width: 500px;
        padding: 20px 10px;
    }

    @media(max-width: 500px) {
        width: 100%;
        border-radius: 0;
        padding: 20px 10px;
    }
`

const LeftSide = styled.div`
    width: 230px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    border-right: 2px solid #000000;

    h2 {
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
        color: #6b0b1a;
    }

    img {
        width: 100px;
        height: 120px;
    }

    @media(max-width: 992px) {
        width: 30%;

        h2 {
            font-size: 22px;
        }

        img {
            width: 80px;
            height: 100px;
        }
    }

    @media(max-width: 700px) {
        width: 45%;
        border-radius: 0;
        padding: 0 20px 0 0 ;
    }

    @media(max-width: 500px) {
        width: 40%;
        border-radius: 0;
        padding: 0 15px 0 0;
    }
`

const RightSide = styled.div`
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 20px;

    @media(max-width: 992px) {
        width: 70%;
    }

    @media(max-width: 700px) {
        width: 55%;
    }

    @media(max-width: 500px) {
        width: 60%;
        padding: 4px 0 0 15px;
    }
`

const Porcentage = styled.div`
    width: 100%;

    h3 {
        font-size: 24px;
        font-weight: 700;
        color: #6b0b1a;
    }

    @media(max-width: 992px) {
        h3 {
            font-size: 22px;
        }
    }

    @media(max-width: 500px) {
        h3 {
            font-size: 20px;
        }
    }
`

const Data = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 80px;

    div {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    h4 {
        font-size: 26px;
        font-weight: 500;
        color: #6b0b1a;
    }

    strong {
        font-size: 24px;
        font-weight: 800;
        color: #000000;
    }

    @media(max-width: 992px) {
        gap: 40px;
        h4 {
            font-size: 20px;
            font-weight: 600;
        }

        strong {
            font-size: 20px;
            font-weight: 700;
        }
    }

    @media(max-width: 700px) {
        flex-direction: column;
        gap: 4px;
        align-items: start;
        margin-top: 20px;
        div {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
    }
`