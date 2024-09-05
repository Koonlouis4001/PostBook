import React, { useContext, useEffect, useState } from "react";
import defaultUser from "../../image/defaultUser.png"
import PropTypes from "prop-types";
import ApiConnection from "../../ApiConnection";
import Notification from "../Notification/Notification";
import { Context } from "../../Context";

function Input({refreshPosts}) {
    const modelInput = {
        title: "",
    };
    const [input, setInput] = useState(modelInput);
    const [postMenu,setPostMenu] = useState(false);
    const [warning,setWarning] = useState();
    const profileImage = localStorage.getItem('profileImage') ? localStorage.getItem('profileImage') : defaultUser;

    const {profileId} = useContext(Context);

    const apiConnection = new ApiConnection;

    const addPost = async (input) => {
        if(profileId) {
            let data = await apiConnection.postDataWithFile(`http://localhost:3000/posts/upload/${profileId}`,input);
            if(data?.status === 200 || data?.status === 201) {
                setPostMenu(false);
                refreshPosts();
            }
            else {
                setWarning(data.message);
            }
        }
    }

    function handleChange(event,model,set) {
        if(event.target.type === "file") {
            set({...model,[event.target.name] : event.target.files[0]});
        }
        else {
            set({...model,[event.target.name] : event.target.value});
        }
    }

    function handlePostMenu() {
        setPostMenu(true);
        setInput(modelInput)
    }

    const postWindow = () => {
        return (
            <div className="modal-overlay">
                <div className="modal">
                    
                    <div className="d-flex flex-col gap-4">
                        <div className="Post__header">
                            <div> สร้างโพสต์ </div>
                            <button onClick={()=>setPostMenu(false)}>X</button>
                        </div>
                        {<Notification warning={warning} setWarning={setWarning}/>}
                        <div>
                            <input className="post-input" type="text" name="title" placeholder="คุณกำลังคิดอะไรอยู่?" value={input.title} onChange={(e) => handleChange(e,input,setInput)}/>
                        </div>
                        <div>
                            <input type="file" name="file" onChange={(e) => handleChange(e,input,setInput)}/>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                            <button className="login-button" onClick={()=>addPost(input)}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="Input">
            {postMenu && postWindow()}
            <div className="d-flex Input__header">
                <div className="Post__profile__image">
                    <img src={profileImage} alt="user"/>
                </div>
                <div className="Input__button" onClick={() => handlePostMenu()}>
                    คุณกำลังคิดอะไรอยู่?
                </div>
            </div>
            
            {/*<div className="Input__header">Create Post</div>
            <input
                className="Input__field"
                type="text"
                value={input}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />*/}
        </div>
    )
}

Input.propTypes = {
    refreshPosts: PropTypes.func.isRequired,
}

export default Input;