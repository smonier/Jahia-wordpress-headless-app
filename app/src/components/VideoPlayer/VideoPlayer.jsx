import React, {useRef} from 'react';
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    playerWrapper:{}
}));

const VideoPlayer = (props)=>{
    const classes = useStyles(props);
    const {videoURL} = props;


    const player = useRef(null);



    // const onReadyHandler = () => {
    //     console.log("onReady seekTo 4.2s")
    //     player.current.seekTo(4.2,"seconds");
    // }
    const onStartHandler = () => {
        // player.current.seekTo(4.2,"seconds");
    }


    return (
        <div className={classes.playerWrapper}>
            <ReactPlayer
                ref={player}
                className='react-player'
                url={videoURL}
                controls
                width='100%'
                height='100%'
                // onReady={onReadyHandler}
                onStart={onStartHandler}
                // onProgress={(object)=> console.log("onProgress : ",object)}
            />
        </div>
    )
}

VideoPlayer.propTypes={
    videoURL:PropTypes.string.isRequired,
    ownerID:PropTypes.string.isRequired
}

export default VideoPlayer;