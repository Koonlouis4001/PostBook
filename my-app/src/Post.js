import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

function Post({post,deletePost}) {
    return (
        <div className="Post">
            <button className="Post__delete" onClick={() => deletePost(post.id)}>X</button>
            <div className="Post__title">{post.title}</div>
            <div className="Post__title">Likes: {post.likes}</div>
            <div className="Post__title">Created: {moment(post.created).format("DD-MM-YYYY HH:mm:ss.SSS")}</div>
            <div className="Post__title">Last Modified: {moment(post.modified).format("DD-MM-YYYY HH:mm:ss.SSS")}</div>
            <img className="Post__image" src={`https://picsum.photos/id/${post.id}/1920/1080`}/>
        </div>
    )
}

Post.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired
}

export default Post;