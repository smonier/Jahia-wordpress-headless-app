import React from 'react';
import {Link} from 'react-router-dom';
import {
    makeStyles,
    Card,
    CardMedia,
    CardContent,
    Typography, Grid
} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import LocalOfferTwoToneIcon from "@material-ui/icons/LocalOfferTwoTone";


const NewsItem = props => {
    const classes = useStyles();
    const news = props.item;
    return (
        <Link
            className={classes.link}
            to={`/news/${news.id}`}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={news.image}
                        title={news.title}
                    />
                    <CardContent>
                        <Typography className={classes.title}>
                            {news.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <div dangerouslySetInnerHTML={{__html: news.description.substring(0, 100) + " ..."}}></div>
                        </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions>

                    <div className={classes.root}>
                        <Grid container spacing={6}>
                            {news.newsTags !== null &&
                            <Grid item xs={12}>
                                <Typography variant="body1" color="textSecondary" component="p">
                                            {news.newsTags && news.newsTags.map((tag) => {
                                                return (
                                                    <span> <LocalOfferTwoToneIcon/> {tag}</span>
                                                );

                                            })
                                            }
                                </Typography>
                            </Grid>

                            }

                        </Grid>
                    </div>
                </CardActions>
            </Card>
        </Link>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 400,
        marginTop: 20
    },
    media: {
        height: 250
    },
    link: {
        textDecoration: "none",
        color: theme.palette.text.primary
    },
    h6: {
        textTransform: "capitalize",
    },
    title: {
        textTransform: 'capitalize',
    }

}));

export default NewsItem;

