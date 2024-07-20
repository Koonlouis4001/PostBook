import React, { useState } from "react";
import PropTypes from "prop-types"

function Post({id,title,deletePost}) {
    return (
        <div className="Post">
            <button className="Post__delete" onClick={() => deletePost(id)}>X</button>
            <div className="Post__title">{title}</div>
            <img className="Post__image" src={`https://picsum.photos/id/${id}/1920/1080`}/>
        </div>
    )
}

Post.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired
}

export default Post;