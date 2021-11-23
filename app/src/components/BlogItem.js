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


const BlogItem = props => {
    const classes = useStyles();
    const Blog = props.item;
    return (
        <Link
            className={classes.link}
            to={`/Blog/${Blog.id}`}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={Blog.image}
                        title={Blog.title}
                    />
                    <CardContent>
                        <Typography className={classes.title}>
                            {Blog.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {new Date(Blog.date).toLocaleDateString("en-US")}

                            <div dangerouslySetInnerHTML={{__html: Blog.summary && Blog.summary.substring(0, 100) + " ..."}}></div>
                        </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions>

                    <div className={classes.root}>
                        <Grid container spacing={6}>
                            {Blog.BlogTags !== null &&
                            <Grid item xs={12}>
                                <Typography variant="body1" color="textSecondary" component="p">
                                            {Blog.BlogTags && Blog.BlogTags.map((tag) => {
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

export default BlogItem;

