import React from 'react';
import {Paper, Typography, CardMedia, makeStyles, Button, Grid} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {GET_NEWS_DETAIL} from "./graphql/NewsDetailGraphQL.js";
import {useQuery} from "@apollo/client";
import {useHistory} from "react-router-dom";
import {gqlConfig} from "./gql.config";
import Media from "./Media";
import Category from "./Category";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventIcon from '@material-ui/icons/Event';

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
    }
}));


const NewsDetail = (props) => {
    let {newsId} = useParams();
    const classes = useStyles();
    const variables = Object.assign(gqlConfig, {newsId: newsId})
    const {loading, error, data} = useQuery(GET_NEWS_DETAIL, {
        variables: variables,
    });

    const [news, setNews] = React.useState([]);


    React.useEffect(() => {
        if (loading === false && data) {
            const newsNode = data.response.news;
            let item = [];
            item = {
                id: newsNode.newsId,
                title: newsNode.title,
                body: newsNode.description.value,
                image: process.env.REACT_APP_JCONTENT_FILES_ENDPOINT + `${newsNode.image.refNode.path}`,
                publishedDate: newsNode.publishedDate.value,
                publishedBy: newsNode.publishedBy.value,
                mediaId: newsNode.media && newsNode.media.node.id,
                mediaPath: newsNode.media && newsNode.media.node.path,
                mediaType: newsNode.media && newsNode.media.node.type.value,
                mediaMixins: newsNode.media && newsNode.media.node.mixins,
                newsTags: newsNode.tags && newsNode.tags.values,
                newsCategories: newsNode.categories && newsNode.categories.values
            }
            setNews(item);
        }
    }, [loading, data]);

    if (loading) return <img src={`https://via.placeholder.com/512x256/09f/fff?text=Loading`} alt="loading"/>;
    if (error) return <p>Error ${error}</p>;

    console.log(news);

    return (
        <Paper
            className={classes.root} elevation={3}>
            {news !== undefined &&
            <>

                {news.image !== "" &&
                <CardMedia
                    image={news.image}
                    className={classes.media}/>
                }
                <div className={classes.content}>
                    <BackButton/>

                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            {news.newsTags !== null &&
                            <Grid item xs={6}>
                                <Typography variant="h6" className={classes.title}>
                                    Tags
                                </Typography>
                                <Paper className={classes.paper}>
                                    <div className={classes.demo}>
                                        <List>
                                            {news.newsTags && news.newsTags.map((tag) => {
                                                return (
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <LocalOfferTwoToneIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {tag}
                                                        </ListItemText>
                                                    </ListItem>
                                                );
                                            })
                                            }
                                        </List>
                                    </div>
                                </Paper>
                            </Grid>
                            }
                            {news.newsCategories !== null &&
                            <Grid item xs={6}>
                                <Typography variant="h6" className={classes.title}>
                                    Categories
                                </Typography>
                                <Paper className={classes.paper}>
                                    <div className={classes.demo}>
                                        <List>
                                            {news.newsCategories && news.newsCategories.map((cat) => {
                                                return (
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <CategoryTwoToneIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            <Category uuid={cat}/>
                                                        </ListItemText>
                                                    </ListItem>
                                                );
                                            })
                                            }
                                        </List>
                                    </div>

                                </Paper>

                            </Grid>
                            }
                        </Grid>
                    </div>

                    <Typography variant="h4" className={classes.title}>{news.title}</Typography>
                    <Typography variant="body2" component="p">
                        <AccountCircleIcon/>{news.publishedBy}
                    </Typography>
                    <Typography variant="body2"
                                component="p">
                        <EventIcon/> {new Date(news.publishedDate).toLocaleDateString("en-US")}
                    </Typography>
                    <div dangerouslySetInnerHTML={{__html: news.body}}/>

                    {news.mediaId &&
                    <Media id={news.mediaId}
                           type={news.mediaType ? news.mediaType : null}
                           mixins={news.mediaMixins ? news.mediaMixins.map(mixin => mixin.value) : []}
                           path={news.mediaPath}
                           sourceID={news.mediaId}
                           alt={news.title}
                    />
                    }

                </div>
            </>
            }
        </Paper>
    );
}

export default NewsDetail;


export const BackButton = () => {
    let history = useHistory();
    return (
        <>
            <Button onClick={() => history.goBack()} variant="contained" color="primary">Back</Button>
        </>
    );
};