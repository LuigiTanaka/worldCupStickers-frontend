import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function SignUpPage() {
    const { setUser, apiUrl } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');

    const [loading, setLoading] = useState(false);

    function signUp(event) {
        event.preventDefault();

        setLoading(true);

        if(!email || !password || !confirmPassword || !username) {
            alert("all fields need to be filled");
            setLoading(false);
        } else {
            const body = {
                username,
                email,
                pictureUrl: pictureUrl ? pictureUrl : null,
                password,
                confirmPassword
            }
    
            const promise = axios.post(`${apiUrl}/sign-up`, body);
    
            promise
                .then(res => {
                    setUser(res.data);
                    navigate("/");
                }).catch((err) => {
                    alert(err.message);
                    setLoading(false);
                })
        }
    }

    function createForm() {
        if (!loading) {
            return (
                <>  
                    <label>
                        <h3>Username</h3>
                        <Input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                    </label>
                    <label>
                        <h3>Email</h3>
                        <Input type="email" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </label>
                    <label>
                        <h3>Password</h3>
                        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </label>
                    <label>
                        <h3>Confirm password</h3>
                        <Input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    </label>
                    <label>
                        <h3>Picture url (optional)</h3>
                        <Input type="text" placeholder="picture url" onChange={(e) => setPictureUrl(e.target.value)} value={pictureUrl} />
                    </label>
                    <Button id="button" type="submit">sign up</Button>
                </>
            )
        } else {
            return (
                <>
                    <label>
                        <h3>Username</h3>
                        <Input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username} disabled={true} />
                    </label>
                    <label>
                        <h3>Email</h3>
                        <Input type="email" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} value={email} disabled={true} />
                    </label>
                    <label>
                        <h3>Password</h3>
                        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={true} />
                    </label>
                    <label>
                        <h3>Confirm password</h3>
                        <Input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} disabled={true} />
                    </label>
                    <label>
                        <h3>Picture url (optional)</h3>
                        <Input type="text" placeholder="picture url" onChange={(e) => setPictureUrl(e.target.value)} value={pictureUrl} disabled={true} />
                    </label>
                    <Button id="button" type="submit" disabled={true}><ThreeDots height={70} width={70} color="#FFFFFF" /></Button>
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
                <form onSubmit={signUp}>
                    {loginForm}
                </form>
                <h6 onClick={() => navigate("/")}>already have an account? go to login</h6>
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
    background-color: #601717;
    display: flex;
    flex-direction: column;
    padding: 100px 30px;
    color: #FFFFFF;

    h1 {
        font-weight: 800;
        font-size: 80px;
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
        z-index: 1;
        position: fixed;
        top: 0;

        h1 {
            font-size: 60px;
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
        z-index: 1;
        position: fixed;
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
    justify-content: center;
    min-height: 100vh;
    width: 500px;

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
            color: #721b1b;
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

        form {
            padding-top: 110px;
        }

        h6 {
            font-size: 17px;
            line-height: 20px;
            padding-bottom: 110px;
        }
    }
`

const Input = styled.input`
    width: 374px;
    height: 54px;
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
    width: 374px;
    height: 54px;
    border-radius: 6px;
    border: none;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
    background-color: #721b1b;
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