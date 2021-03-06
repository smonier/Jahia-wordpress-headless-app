import React from 'react';
import PropTypes from "prop-types";
import Image from './components/Image';
import Video from './components/Video';
import WidenImage from './components/widen/WidenImage';
import WidenVideo from './components/widen/WidenVideo';
import {cnd_type} from "../media.config";

const Media = ({id,type,mixins,path,sourceID,alt}) => {

    const {files_endpoint} = process.env.REACT_APP_JCONTENT_FILES_ENDPOINT;


    // console.log("Media equals: ",type === cnd_type.WIDEN_IMAGE)
    let component = <></>;
    switch(type){
        case cnd_type.WIDEN_IMAGE :
            component = <WidenImage uuid={id} />
            break;

        case cnd_type.WIDEN_VIDEO :
            component = <WidenVideo uuid={id} ownerID={sourceID} />
            break;

        case cnd_type.EXT_VIDEO:
            component = <Video url={path} ownerID={sourceID} />
            break;
            
        case cnd_type.JNT_FILE:
            if(mixins.includes(cnd_type.IMAGE)){
                component = <Image path={path} alt={alt}/>
            }else{
                component = <Video url={files_endpoint+encodeURI(path)} ownerID={sourceID} />
            }
            break;
            
        default:
            if(path)
                component = <Image path={path} alt={alt}/>
            break;
    }
    // console.log("Media component: ",component)
    return(component)
}

Media.propTypes={
    id:PropTypes.string,
    type:PropTypes.string,
    mixins:PropTypes.array,
    path:PropTypes.string,
    sourceID:PropTypes.string,
    alt:PropTypes.string
}

export default Media;