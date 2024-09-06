import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ApiConnection from "../../../ApiConnection";
import Notification from "../../Notification/Notification";

function UpdateButton({post,setUpdateMenu,refreshPosts}) {
    const [warning,setWarning] = useState();
    const [newPost,setNewPost] = useState(post);
    const apiConnection = new ApiConnection();

    const updatePost = async (post) => {
        let data = await apiConnection.patchData(`http://localhost:3000/posts/${post.id}`,newPost);
        console.log(data)
        if(data?.statusCode === 200 && data?.statusCode === 201) {
            setUpdateMenu(false);
            refreshPosts();
            
        }
        else {
            setWarning(data.message);
        }
    }

    const handleChange = (event) => {
        setNewPost({...newPost,[event.target.name] : event.target.value});
    }

    const updateWindow = () => {
        return (
            <div className="popup">
                <div className="box">
                    {<Notification warning={warning} setWarning={setWarning}/>}
                    <div className="popup-input">
                        <div className="popup-title">Title</div>
                        <input className="popup-box" type="text" name="title" value={newPost.title} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div  className="popup-button">
                        <button className="btn-delete" onClick={()=>updatePost(newPost)}>Update</button>
                        <button className="btn-close" onClick={()=>setUpdateMenu(false)}>Close</button>
                    </div>
                </div>
            </div>
        )
    }

    return (updateWindow())
}

UpdateButton.propTypes = {
    post: PropTypes.object.isRequired,
    setUpdateMenu: PropTypes.func.isRequired,
    refreshPosts: PropTypes.func.isRequired,
}

export default UpdateButton;