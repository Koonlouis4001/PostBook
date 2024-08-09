import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import defaultUser from "../image/defaultUser.png"

function Post({post,deletePost,updatePost}) {
    const [showMenu,setShowMenu] = useState(false);
    const [updateMenu,setUpdateMenu] = useState(false);
    const [deleteMenu,setDeleteMenu] = useState(false);

    const [newPost,setNewPost] = useState(post);

    function handleChange(event) {
        setNewPost({...newPost,[event.target.name] : event.target.value});
    }

    function updateWindow() {
        return (
            <div className="Popup">
                <div className="Box">
                    <div className="Popup_Input">
                        <div className="Popup_Title">Title</div>
                        <input className="Popup_Box" type="text" name="title" value={newPost.title} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div  className="Popup_Button">
                        <button className="btn-delete" onClick={()=>updatePost(newPost)}>Update</button>
                        <button className="btn-close" onClick={()=>setUpdateMenu(false)}>Close</button>
                    </div>
                </div>
            </div>
        )
    }

    function deleteWindow() {
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
            {updateMenu && updateWindow()}
            {deleteMenu && deleteWindow()}
            <div className="Post__header">
                <div className="Post__profile">
                    <div className="Post__profile__image">
                        <img src={defaultUser} alt="user"/>
                    </div>
                    <div>
                        <div>
                            {post?.profile?.profileName}
                        </div>
                        <div>
                            {moment(post?.created).format("DD-MM-YYYY HH:mm:ss.SSS")}
                        </div>
                    </div>
                </div>
                <button className="Post__menu" onClick={() => setShowMenu(!showMenu)}>...</button>
                {showMenu && 
                <div style={{display:"flex"}}>
                    <button onClick={() => {setUpdateMenu(true); setShowMenu(false);}}>Edit Post</button>
                    <button onClick={() => {setDeleteMenu(true); setShowMenu(false);}}>Delete Post</button>
                </div>}
            </div>
            <div className="Post__title">{post?.title}</div>
            {/*<div className="Post__title">Likes: {post?.likes}</div>
            <div className="Post__title">Created: {moment(post?.created).format("DD-MM-YYYY HH:mm:ss.SSS")}</div>
            <div className="Post__title">Last Modified: {moment(post?.modified).format("DD-MM-YYYY HH:mm:ss.SSS")}</div>*/}
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