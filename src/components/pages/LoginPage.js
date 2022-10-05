import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import logo from "../../assets/logo.png";

export default function Login() {
    const { setUser, apiUrl } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    function login(event) {
        event.preventDefault();

        setLoading(true);

        if (!email || !password) {
            alert("all fields need to be filled");
            setLoading(false);
        } else {
            const body = {
                email,
                password
            }

            const promise = axios.post(`${apiUrl}/sign-in`, body);

            promise
                .then(res => {
                    setUser(res.data);
                    localStorage.setItem("userData", JSON.stringify(res.data));
                    navigate("/stickers");
                }).catch((err) => {
                    console.log(err.response);
                    alert(err.response.data);
                    setLoading(false);
                })
        }
    }

    function createForm() {
        if (!loading) {
            return (
                <>
                    <label>
                        <h3>Email</h3>
                        <Input type="email" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </label>
                    <label>
                        <h3>Password</h3>
                        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </label>
                    <Button type="submit">login</Button>
                </>
            )
        } else {
            return (
                <>
                    <label>
                        <h3>Email</h3>
                        <Input type="email" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} value={email} disabled={true} />
                    </label>
                    <label>
                        <h3>Password</h3>
                        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={true} />
                    </label>
                    <Button type="submit" disabled={true}><ThreeDots height={70} width={70} color="#FFFFFF" /></Button>
                </>
            )
        }
    }

    const loginForm = createForm();

    return (
        <Container>
            <Title>
                <h1>WORLD CUP STICKERS</h1>
                <h2>save and organize your stickers in an easy and practical way</h2>
            </Title>
            <Forms>
                <img src={logo} alt="logo" />
                <form onSubmit={login}>
                    {loginForm}
                </form>
                <h6 onClick={() => navigate("/sign-up")}>First time? Create an account!</h6>
            </Forms>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background-color: #F0F0E4;

    @media(max-width: 992px) {
        flex-direction: column;
    }
`

const Title = styled.div`
    width: calc(100% - 500px);
    height: 100vh;
    background-color: #8B2938;
    display: flex;
    flex-direction: column;
    padding: 100px 20px;
    align-items: center;
    font-family: 'Gemunu Libre', sans-serif;
    color: #FFFFFF;

    h1 {
        font-weight: 800;
        font-size: 86px;
        line-height: 117px;
        letter-spacing: 0.05em;
    }

    h2 {
        font-weight: 700;
        font-size: 36px;
        line-height: 64px;
    }

    @media(max-width: 992px) {
        width: 100%;
        height: 90px;
        padding: 0;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        position: absolute;
        top: 0;

        h1 {
            font-size: 50px;
            line-height: 84px;
        }

        h2 {
            display: none;
        }
    }

    @media(max-width: 600px) {
        width: 100%;
        height: 90px;
        padding: 0;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        position: absolute;
        top: 0;

        h1 {
            font-size: 36px;
            line-height: 84px;
        }

        h2 {
            display: none;
        }
    }
`

const Forms = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 500px;

    img {
        width: 200px;
        height: 200px;
        margin: 50px 0;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        display: flex;
        flex-direction: column;

        h3 {
            font-size: 20px;
            font-weight: 700;
            color: #8B2938;
            margin-bottom: 5px;
        }
    }
    
    h6 {
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        margin-top: 22px;
        text-decoration-line: underline;
        color: #59101B;
    }

    @media(max-width: 992px) {
        width: 100%;
        min-height: calc(100vh - 175px);
        justify-content: start;

        img {
            width: 180px;
            height: 180px;
            margin: 25px 0 10px 0;
        }

        form {
            
        }

        h6 {
            font-size: 17px;
            line-height: 20px;
        }
    }
`

const Input = styled.input`
    width: 380px;
    height: 60px;
    border: 1px solid #D5D5D5;
    border-radius: 6px;
    padding: 11px 15px;
    font-size: 20px;
    margin-bottom: 13px;

    &::placeholder {
        font-weight: 500;
        font-size: 25px;
        line-height: 40px;
        color: #DDDDDD;
    }

    &:disabled {
        background-color: #F2F2F2;
        color: #AFAFAF;
    }

    @media(max-width: 992px) {
        width: 330px;
        height: 55px;

        &::placeholder {
            font-size: 22px;
            line-height: 33px;
        }
    }
`

const Button = styled.button`
    width: 380px;
    height: 60px;
    border-radius: 6px;
    border: none;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
    background-color: #8B2938;
    display: flex;
    justify-content: center;
    align-items: center;

    &:disabled {
        opacity: 0.7;
    }

    @media(max-width: 992px) {
        width: 330px;
        height: 55px;
        font-size: 22px;
        line-height: 33px;
    }
`