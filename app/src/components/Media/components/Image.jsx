import React from "react";

const Image = ({path,alt}) =>{
    return(
        <img className="d-block w-100"
             src={process.env.REACT_APP_JCONTENT_FILES_ENDPOINT+`${encodeURI(path)}`}
             alt={alt}/>
    )
}
export default Image;