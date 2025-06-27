import React, { useContext, useEffect, useState } from "react";
import defaultUser from "../../image/defaultUser.png"
import PropTypes from "prop-types";
import ApiConnection from "../../ApiConnection";
import Notification from "../Notification/Notification";
import { Context } from "../../Context";

Input.propTypes = {
    addPost: PropTypes.func.isRequired,
}

function Input({addPost}) {
    const modelInput = {
        title: "",
    };
    const [input, setInput] = useState(modelInput);
    const [postMenu,setPostMenu] = useState(false);
    const [warning,setWarning] = useState();
    const profileImage = localStorage.getItem('profileImage') ? localStorage.getItem('profileImage') : defaultUser;

    const {profileId} = useContext(Context);

    const apiConnection = new ApiConnection;

    const add = async (input) => {
        if(profileId) {
            let result = await apiConnection.postDataWithFile(`posts/upload/${profileId}`,input);
            if(result?.status === 200 || result?.status === 201) {
                setPostMenu(false);
                addPost(result.data);
            }
            else {
                setWarning(result.message);
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
                        <div className="post-header">
                            <div> สร้างโพสต์ </div>
                            <button onClick={()=>setPostMenu(false)}>X</button>
                        </div>
                        {<Notification warning={warning} setWarning={setWarning}/>}
                        <div>
                            <input className="post-input" type="text" name="title" placeholder={`${localStorage.getItem('profileName')} คุณกำลังคิดอะไรอยู่?`} value={input.title} onChange={(e) => handleChange(e,input,setInput)}/>
                        </div>
                        <div>
                            <input type="file" name="file" onChange={(e) => handleChange(e,input,setInput)}/>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                            <button className="login-button" onClick={()=>add(input)}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="input">
            {postMenu && postWindow()}
            <div className="d-flex input-header">
                <div className="post-profile-image">
                    <img src={profileImage} alt="user"/>
                </div>
                <div className="input-button" onClick={() => handlePostMenu()}>
                    {localStorage.getItem('profileName')} คุณกำลังคิดอะไรอยู่?
                </div>
            </div>
        </div>
    )
}

export default Input;