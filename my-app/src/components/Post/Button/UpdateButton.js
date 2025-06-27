import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ApiConnection from "../../../ApiConnection";
import Notification from "../../Notification/Notification";

UpdateButton.propTypes = {
    post: PropTypes.object.isRequired,
    setUpdateMenu: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
}

function UpdateButton({post,setUpdateMenu,updatePost}) {
    const [warning,setWarning] = useState();
    const [newPost,setNewPost] = useState(post);
    const apiConnection = new ApiConnection();

    const update = async (post) => {
        let result = await apiConnection.patchData(`posts/${post.id}`,newPost);
        //console.log(result)
        if(result?.status === 200 || result?.status === 201) {
            updatePost(result.data);
            setUpdateMenu(false);
        }
        else {
            setWarning(result.message);
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
                        <button className="btn-delete" onClick={()=>update(newPost)}>Update</button>
                        <button className="btn-close" onClick={()=>setUpdateMenu(false)}>Close</button>
                    </div>
                </div>
            </div>
        )
    }

    return (updateWindow())
}

export default UpdateButton;