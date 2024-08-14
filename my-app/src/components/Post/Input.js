import React, { useEffect, useState } from "react";
import defaultUser from "../../image/defaultUser.png"
import PropTypes from "prop-types";

function Input({addPost,post,postMenu,setPostMenu}) {
    const [input, setInput] = useState({});
    const modelInput = {};

    function handleChange(event,model,set) {
        console.log(event.target.type)
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
                    <img src={defaultUser} alt="user"/>
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
    addPost: PropTypes.func.isRequired
}

export default Input;