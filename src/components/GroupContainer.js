import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import CategoryContainer from "./CategoryContainer";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function GroupContainer({ groupName, groupId, repeatedPage, setLoading }) {
    const { apiUrl, authorization } = useContext(UserContext);

    const [categories, setCategories] = useState([]);
    const [totalGroup, setTotalGroup] = useState(0);
    const [totalOwnerGroup, setTotalOwnerGroup] = useState(0);

    useEffect(() => {
        const URL = `${apiUrl}/stickers-data/groups/${groupId}`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            setTotalGroup(response.data.sumAllGroup);
            setTotalOwnerGroup(response.data.sumOwnerGroup);
        }).catch((err) => {
            console.log(err);
        });
    }, [apiUrl, authorization, groupId]);

    useEffect(() => {
        const URL = `${apiUrl}/stickers/categories/${groupId}`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            setCategories(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [apiUrl, authorization, groupId]);

    function showCategories() {
        return (
            <>
                { categories.map((category, index) => <CategoryContainer key={index} categoryName={category.name} categoryId={category.id} repeatedPage={repeatedPage} setLoading={setLoading} />) }
            </>
        );
    }

    function createProgressBar() {
        const now = Math.round((totalOwnerGroup/totalGroup)*100);
        if (now < 20) {
            return (
                <ProgressBar animated variant={"red"} now={now} />
            );
        } else if (now < 40) {
            return (
                <ProgressBar animated variant={"orange"} now={now} />
            );
        } else if (now < 75) {
            return (
                <ProgressBar animated variant={"yellow"} now={now} />
            );
        } else if (now < 100){
            return (
                <ProgressBar animated variant={"green"} now={now} />
            );
        } else {
            return (
                <ProgressBar animated variant={"complete"} now={now} />
            );
        }
    }

    function createPorcentage() {
        if(!repeatedPage) {
            return (
                <div>
                    <h2>{`${Math.round((totalOwnerGroup/totalGroup)*100)}% (${totalOwnerGroup}/${totalGroup})`}</h2>
                    {progressBar}
                </div>
            );
        } else {
            return null;
        }
    }

    const categoriesContainer = showCategories();
    const progressBar = createProgressBar();    
    const porcentage = createPorcentage();
    
    return (
        <Container>
            <Title>
                <h1>{groupName}</h1>
                {porcentage}
            </Title>
            <CategoriesContainer>
                {categoriesContainer}
            </CategoriesContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 860px;
    height: fit-content;
    display: flex;
    background-color: #F0F0E4;
    box-shadow: 5px 5px 5px 3px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    @media(max-width: 992px) {
        width: 500px;
    }

    @media(max-width: 500px) {
        border-radius: 0px;
        width: 100%;
    }
`

const Title = styled.div`
    width: 100%;
    height: 70px;
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
        text-align: center;
        margin-bottom: 4px;
    }

    div {
        width: 100%;
        border-radius: 0px;
    }

    .bg-red {
        background-color: #d81c1c;
        border-radius: 0 6px 6px 0;
    }

    .bg-orange {
        background-color: #fc8a00;
        border-radius: 0 6px 6px 0;
    }

    .bg-yellow {
        background-color: #e5d312;
        border-radius: 0 6px 6px 0;
    }

    .bg-green {
        background-color: #26c13b;
        border-radius: 0 6px 6px 0;
    }

    .bg-complete {
        background-color: #CA9B42;
        border-radius: 0;
        filter: brightness(1.55);
    }
    

    @media(max-width: 500px) {
        border-radius: 0;
        height: 68px;

        h1 {
            font-size: 28px;
            font-weight: 800;
        }

        h2 {
            font-size: 18px;
            font-weight: 500;
        }
    }
`

const CategoriesContainer = styled.div`
    padding: 30px;
    display: grid;
    justify-content: center;
    grid-template-columns: 380px 380px;
    row-gap: 30px;
    column-gap: 20px;

    @media(max-width: 992px) {
        padding: 30px 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media(max-width: 500px) {
        padding: 30px;
    }

    @media(max-width: 400px) {
        padding: 20px;
    }
`