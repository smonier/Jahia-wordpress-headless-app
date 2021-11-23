import React from 'react';
import {GET_CATEGORY} from "./graphql/CategoryGraphQL.js";
import {useQuery} from '@apollo/client';
import {gqlConfig} from "./gql.config";


const Category = ({uuid}) => {

    const variables = Object.assign(gqlConfig, {uuid: uuid})
    const {loading, error, data} = useQuery(GET_CATEGORY, {
        variables: variables,
    });
    const [cat, setCat] = React.useState([]);


    React.useEffect(() => {
        if (loading === false && data) {
            const catNode = data.response.category;
            let item = [];
            item = {
                title: catNode.title
            }
            setCat(item);
        }
    }, [loading, data]);

    if (loading) return <img src={`https://via.placeholder.com/512x256/09f/fff?text=Loading`} alt="loading"/>;
    if (error) return <p>Error ${error}</p>;

    return (
        <span>{cat.title}</span>
    )
}

export default Category;