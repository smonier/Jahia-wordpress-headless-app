import React from 'react';
import BlogList from './BlogList';
import BlogDetail from './BlogDetail';
import {Container} from '@material-ui/core';
import {GET_BLOGPOSTS} from "./graphql/BlogListGraphQL";
import {useQuery} from '@apollo/client';
import {HashRouter, Route} from 'react-router-dom';
import {gqlConfig_blog} from "./gql.config";

const Blogs = props => {
    const {loading, error, data} = useQuery(GET_BLOGPOSTS, {
        variables: gqlConfig_blog,
    });

    const [blogItems, setBlogItems] = React.useState([]);


    React.useEffect(() => {
        let items = [];
        if (loading === false && data) {

            data.response.blogList.descendants.nodes.forEach(node => {
                items.push({
                        id: node.uuid,
                        title: node.title,
                        summary: node.summary && node.summary.value,
                        image: node.image && process.env.REACT_APP_JCONTENT_FILES_ENDPOINT + `${node.image.refNode.path}`,
                        created: node.created.value,
                        date: node.date.value,
                        blogTags: node.tags && node.tags.values,
                        blogCategories: node.categories && node.categories.values
                    }
                );

            })
            setBlogItems(items);

        }
    }, [loading, data]);

    if (loading) return <img src={`https://via.placeholder.com/512x256/09f/fff?text=Loading`} alt="loading"/>;
    if (error) return <p>Error ${error}</p>;

    return (
        <Container>
            <HashRouter>
                <Route exact path="/blog/:blogId" render={() => <BlogDetail />}/>
                <Route exact path="/" render={() => <BlogList items={blogItems}/>}/>
            </HashRouter>
        </Container>
    );
};

export default Blogs;
