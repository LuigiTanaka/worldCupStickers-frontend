import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import album from "../assets/images/album.jpg";
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function GeneralFramework() {
    const { apiUrl, authorization, user } = useContext(UserContext);

    const [total, setTotal] = useState(0);
    const [totalOwner, setTotalOwner] = useState(0);
    const [totalRepeated, setTotalRepeated] = useState(0);

    useEffect(() => {
        const URL = `${apiUrl}/stickers-data`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            setTotal(response.data.sumAll);
            setTotalOwner(response.data.sumOwner);
            setTotalRepeated(response.data.sumRepeated);
        }).catch((err) => {
            console.log(err);
        });
    }, [apiUrl, authorization]);

    function createProgressBar() {
        const now = Math.round((totalOwner/total)*100);
        if (now < 20) {
            return (
                <ProgressBar animated variant={"danger"} now={now} />
            );
        } else if (now < 40) {
            return (
                <ProgressBar animated variant={"warning"} now={now} />
            );
        } else if (now < 70) {
            return (
                <ProgressBar animated variant={"info"} now={now} />
            );
        } else {
            return (
                <ProgressBar animated variant={"success"} now={now} />
            );
        }
    }

    const progressBar = createProgressBar();

    return (
        <Container>
            <LeftSide>
                <h2>{`${user.userData.username.toUpperCase()}'s ALBUM`}</h2>
                <img src={album} alt="album"/>
            </LeftSide>
            <RightSide>
                <Porcentage>
                    <h3>{`${Math.round((totalOwner/total)*100)}% (${totalOwner}/${total})`}</h3>
                    {progressBar}
                </Porcentage>
                <Data>
                    <div>
                        <h4><strong>Total in the album: </strong>{total}</h4>
                        <h4><strong>Total you have: </strong>{totalOwner}</h4>
                    </div>
                    <div>
                        <h4><strong>Total missing: </strong>{total - totalOwner}</h4>
                        <h4><strong>Total repeated: </strong>{totalRepeated}</h4>
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
        width: 35%;
        border-radius: 0;
        padding: 0 20px 0 0 ;
    }

    @media(max-width: 500px) {
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
        width: 65%;
    }

    @media(max-width: 500px) {
        padding: 4px 0 0 15px;
    }
`

const Porcentage = styled.div`
    width: 100%;

    h3 {
        font-size: 24px;
        font-weight: 700;
        color: #6b0b1a;
        margin-bottom: 5px;
    }

    @media(max-width: 992px) {
        h3 {
            font-size: 22px;
        }
    }

    @media(max-width: 700px) {
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
        margin-top: 10px;
        div {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        h4 {
            font-size: 18px;
            font-weight: 600;
        }

        strong {
            font-size: 18px;
            font-weight: 700;
        }
    }
`