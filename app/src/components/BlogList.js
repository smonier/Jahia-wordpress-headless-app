import React from 'react';
import BlogItem from './BlogItem';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HeroBanner from "./HeroBanner";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const BlogList = props => {
    let { profileId, sessionId } = props;

    const classes = useStyles();
    const [tagSelected, setSelectedTag] = React.useState('');

    const handleChange = (event) => {
        setSelectedTag(event.target.value);
    };
    const tagList = [];

    props.items.map((item) => (
        item.blogTags && item.blogTags.map((tag) => {
            tagList.indexOf(tag) === -1 ? tagList.push(tag) : console.log("Tags Filter, This item already exists");
        })))
    if (!profileId || !sessionId) {
        console.warn("unomi profile or session are unavailable");
        return <Loading />;
    }
    return (
        <Grid container spacing={2}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <HeroBanner
                        profileId={profileId}
                        sessionId={sessionId}/>
                </Grid>

                <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tagSelected}
                            onChange={handleChange}
                        >
                            <MenuItem value="All">
                                <em>All</em>
                            </MenuItem>
                            {tagList.map(tag => {
                                return ( <MenuItem value={tag}>{tag}</MenuItem> )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {props.items.filter(Blog => ((tagSelected && tagSelected !== "All") ? (Blog.blogTags.indexOf(tagSelected) >= 0) : (Blog.id !== null))).map((item) => (
                <Grid
                    item sm={12} md={3}
                    key={item.id}>
                    <BlogItem item={item}/>
                </Grid>
            ))}
        </Grid>
    )
};
export default BlogList;
