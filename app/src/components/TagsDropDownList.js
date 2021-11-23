import React from 'react';
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

const TagDropDownList = ({tagList}) => {
    const classes = useStyles();
    const [tag, setTag] = React.useState('');

    const handleChange = (event) => {
        setTag(event.target.value);
    };
    console.log(tagList);
    return (

    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Tags</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tag}
            onChange={handleChange}
        >
            <MenuItem value="">
                <em>All</em>
            </MenuItem>
            {tagList.map(tag => {
                return ( <MenuItem value={tag}>{tag}</MenuItem> )
            })}
        </Select>
    </FormControl>
    );
}

export default TagDropDownList;