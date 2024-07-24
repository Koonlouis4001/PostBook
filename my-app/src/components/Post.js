import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Post({post,deletePost,updatePost}) {
    const [showMenu,setShowMenu] = useState(false);
    const [updateMenu,setUpdateMenu] = useState(false);
    const [deleteMenu,setDeleteMenu] = useState(false);

    const deleteWindow = () => {
        return (
            <div className="Popup">
                <div className="Box">
                    <div className="Popup_Header">
                        <div>Are you sure you want to delete this post?</div>
                        <div>Title : {post.title}</div>
                    </div>
                    <div  className="Popup_Button">
                        <button className="btn-delete" onClick={()=>deletePost(post.id)}>Delete</button>
                        <button className="btn-close" onClick={()=>setDeleteMenu(false)}>Close</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="Post">
            {deleteMenu && deleteWindow()}
            <div className="Post__header">
                <button className="Post__menu" onClick={() => setShowMenu(!showMenu)}>...</button>
                {showMenu && 
                <div style={{display:"flex"}}>
                    <button onClick={() => {setUpdateMenu(true); setShowMenu(false);}}>Edit Post</button>
                    <button onClick={() => {setDeleteMenu(true); setShowMenu(false);}}>Delete Post</button>
                </div>}
            </div>
            <div className="Post__title">{post?.title}</div>
            <div className="Post__title">Likes: {post?.likes}</div>
            <div className="Post__title">Created: {moment(post?.created).format("DD-MM-YYYY HH:mm:ss.SSS")}</div>
            <div className="Post__title">Last Modified: {moment(post?.modified).format("DD-MM-YYYY HH:mm:ss.SSS")}</div>
            <img className="Post__image" src={`https://picsum.photos/id/${post?.id}/1920/1080`}/>
        </div>
    )
}

Post.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired
}

export default Post;