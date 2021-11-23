import React from 'react';
import NewsList from './NewsList';
import NewsDetail from './NewsDetail';
import {Container} from '@material-ui/core';
import {GET_NEWS} from "./graphql/NewsListGraphQL.js";
import {useQuery} from '@apollo/client';
import {HashRouter, Route} from 'react-router-dom';
import {gqlConfig} from "./gql.config";

const News = props => {
    const {loading, error, data} = useQuery(GET_NEWS, {
        variables: gqlConfig,
    });

    const [newsItems, setNewsItems] = React.useState([]);


    React.useEffect(() => {
        let items = [];
        if (loading === false && data) {
            data.response.newsList.children.nodes.forEach(node => {
                items.push({
                        id: node.uuid,
                        title: node.title,
                        description: node.description.value,
                        image: process.env.REACT_APP_JCONTENT_FILES_ENDPOINT + `${node.image.refNode.path}`,
                        created: node.created.value,
                        newsTags: node.tags && node.tags.values,
                        newsCategories: node.categories && node.categories.values
                    }
                );

            })
            setNewsItems(items);

        }
    }, [loading, data]);

    if (loading) return <img src={`https://via.placeholder.com/512x256/09f/fff?text=Loading`} alt="loading"/>;
    if (error) return <p>Error ${error}</p>;

    return (
        <Container>
            <HashRouter>
                <Route exact path="/news/:newsId" render={() => <NewsDetail/>}/>
                <Route exact path="/" render={() => <NewsList items={newsItems}/>}/>
            </HashRouter>
        </Container>
    );
};

export default News;
