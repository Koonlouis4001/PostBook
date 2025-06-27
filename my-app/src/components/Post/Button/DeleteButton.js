import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ApiConnection from "../../../ApiConnection";

DeleteButton.propTypes = {
    post: PropTypes.object.isRequired,
    setDeleteMenu: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
}

function DeleteButton({post,setDeleteMenu,removePost}) {

    const apiConnection = new ApiConnection();
    
    const deletePost = async (id) => {
        let result = await apiConnection.deleteData(`posts/${id}`);
        removePost(id);
        setDeleteMenu(false);
    }

    const deleteWindow = () => {
        return (
            <div className="popup">
                <div className="box">
                    <div className="popup-header">
                        <div>Are you sure you want to delete this post?</div>
                        <div>Title : {post.title}</div>
                    </div>
                    <div  className="popup-button">
                        <button className="btn-delete" onClick={()=>deletePost(post.id)}>Delete</button>
                        <button className="btn-close" onClick={()=>setDeleteMenu(false)}>Close</button>
                    </div>
                </div>
            </div>
        )
    }

    return (deleteWindow())
}

export default DeleteButton;