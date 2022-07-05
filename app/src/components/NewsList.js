import React from 'react';
import NewsItem from './NewsItem';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const NewsList = props => {
    let {profileId, sessionId} = props;

    const classes = useStyles();
    const [tagSelected, setSelectedTag] = React.useState('');

    const handleChange = (event) => {
        setSelectedTag(event.target.value);
    };
    console.log(props.items);
    const filterList = [];

    props.items.map((item) => (
        item.sites && item.sites.map((tag) => {
            filterList.indexOf(tag) === -1 ? filterList.push(tag) : console.log("This item already exists");
        })))
    return (
        <Grid container spacing={2}>
            <Grid container spacing={3}>

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
                            {filterList.map(tag => {
                                return (<MenuItem key={tag} value={tag}>{tag}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {props.items.filter(news => ((tagSelected && tagSelected !== "All") ? (news.sites == null || news.sites.includes(tagSelected) ) : (news.id !== null))).map((item) => {
                return (
                    <Grid
                        item sm={12} md={3}
                        key={item.id}>
                        <NewsItem item={item}
                                  profileId={profileId}
                                  sessionId={sessionId}/>
                    </Grid>
                )
            })}

        </Grid>
    )


};

export default NewsList;
