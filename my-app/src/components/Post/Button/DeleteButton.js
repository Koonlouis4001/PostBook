import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ApiConnection from "../../../ApiConnection";

function DeleteButton({post,setDeleteMenu,refreshPosts}) {

    const apiConnection = new ApiConnection();
    
    const deletePost = async (id) => {
        let data = await apiConnection.deleteData(`http://localhost:3000/posts/${id}`);
        setDeleteMenu(false);
        refreshPosts();
    }

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

    return (deleteWindow())
}

DeleteButton.propTypes = {
    post: PropTypes.object.isRequired,
    setDeleteMenu: PropTypes.func.isRequired,
    refreshPosts: PropTypes.func.isRequired,
}

export default DeleteButton;