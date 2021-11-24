import React from 'react';
import {Paper, Typography, CardMedia, makeStyles, Button, Grid} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {GET_BLOG_DETAIL} from "./graphql/BlogDetailGraphQL.js";
import {useQuery} from "@apollo/client";
import {useHistory} from "react-router-dom";
import {gqlConfig_blog} from "./gql.config";
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventIcon from '@material-ui/icons/Event';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {syncPageView} from "../misc/tracker";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    content: {
        padding: 30
    },
    title: {
        marginTop: 20,
        marginBottom: 20,
        textTransform: 'capitalize',
    },
    media: {
        height: 0,
        paddingTop: "50%"
    },
    Stack: {
        marginRight: 10
    }
}));


const BlogDetail = (props) => {
    let {blogId} = useParams();
    const classes = useStyles();
    const variables = Object.assign(gqlConfig_blog, {blogId: blogId})
    const {loading, error, data} = useQuery(GET_BLOG_DETAIL, {
        variables: variables,
    });

    const [blog, setblog] = React.useState([]);

    React.useEffect(() => {
        if (loading === false && data) {
            const scope = gqlConfig_blog.scope;

            const blogNode = data.response.blog;
            let item = [];
            item = {
                id: blogNode.blogId,
                title: blogNode.title,
                body: blogNode.text.value,
                image: process.env.REACT_APP_JCONTENT_FILES_ENDPOINT + `${blogNode.image.refNode.path}`,
                publishedDate: blogNode.publishedDate.value,
                publishedBy: blogNode.publishedBy.value,
                blogTags: blogNode.tags && blogNode.tags.values,
                blogCategories: blogNode.categories && blogNode.categories.nodes
            }
            setblog(item);

            syncPageView({blogNode,scope});

        }
    }, [loading, data]);

    if (loading) return <img src={`https://giphy.com/embed/3o7bu3XilJ5BOiSGic`} alt="loading" width="480" height="480"/>;
    if (error) return <p>Error ${error}</p>;

    return (
        <Paper
            className={classes.root} elevation={3}>
            {blog !== undefined &&
            <>

                {blog.image !== "" &&
                <CardMedia
                    image={blog.image}
                    className={classes.media}/>
                }
                <div className={classes.content}>
                    <BackButton/>

                    <div className={classes.root}>
                        <Grid container>
                            {blog.blogTags && blog.blogTags.map((tag) => {
                                return (
                                    <Stack direction="row" spacing={1}>
                                        <Chip icon={<LocalOfferTwoToneIcon/>} label={tag} color="primary"
                                              variant="outlined" size="small"/>
                                    </Stack>
                                );
                            })
                            }

                            {blog.blogCategories && blog.blogCategories.map((cat) => {
                                return (
                                    <Stack direction="row" spacing={1}>
                                        <Chip icon={<CategoryTwoToneIcon/>} label={cat.value}
                                              color="success" variant="outlined" size="small">

                                        </Chip>
                                    </Stack>
                                );
                            })
                            }
                        </Grid>
                    </div>

                    <Typography variant="h4" className={classes.title}>{blog.title}</Typography>
                    <Typography variant="body2" component="p">
                        <AccountCircleIcon/>{blog.publishedBy}
                    </Typography>
                    <Typography variant="body2"
                                component="p">
                        <EventIcon/> {new Date(blog.publishedDate).toLocaleDateString("en-US")}
                    </Typography>
                    <div dangerouslySetInnerHTML={{__html: blog.body}}/>
                </div>
            </>
            }
        </Paper>
    );
}

export default BlogDetail;


export const BackButton = () => {
    let history = useHistory();
    return (
        <>
            <Button onClick={() => history.goBack()} variant="contained" color="primary">Back</Button>
        </>
    );
};

