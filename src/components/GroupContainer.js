import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import CategoryContainer from "./CategoryContainer";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function GroupContainer({ groupName, groupId }) {
    const { apiUrl, authorization } = useContext(UserContext);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const URL = `${apiUrl}/stickers/categories/${groupId}`;
        const AUT = authorization;

        const promise = axios.get(URL, AUT);
        promise.then((response) => {
            console.log(response.data);
            setCategories(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [apiUrl, authorization, groupId]);

    function showCategories() {
        return (
            <>
                { categories.map(category => <CategoryContainer categoryName={category.name} categoryId={category.id} />) }
            </>
        );
    }

    const categoriesContainer = showCategories();

    return (
        <Container>
            <Title>
                <h1>{groupName}</h1>
                <h2>{`5% (2/80)`}</h2>
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

const CategoriesContainer = styled.div`
    padding: 30px;
    display: grid;
    justify-content: center;
    grid-template-columns: 380px 380px;
    grid-template-rows: 220px 220px;
    row-gap: 30px;
    column-gap: 20px;
`