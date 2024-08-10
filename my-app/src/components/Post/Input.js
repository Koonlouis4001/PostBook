import React, { useEffect, useState } from "react";
import defaultUser from "../../image/defaultUser.png"
import PropTypes from "prop-types";

function Input({addPost,post,postMenu,setPostMenu}) {
    const [input, setInput] = useState({});

    function handleChange(event,model,set) {
        set({...model,[event.target.name] : event.target.value});
    }

    useEffect(()=> {
        console.log(input);
    },[input])

    const postWindow = () => {
        return (
            <div className="modal-overlay">
                <div className="modal">
                    <div> สร้างโพสต์ </div>
                    <button onClick={()=>setPostMenu(false)}>X</button>
                    <div>
                        <input className="login-input" type="text" name="title" placeholder="title" value={input.title} onChange={(e) => handleChange(e,input,setInput)}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                        <button className="login-button" onClick={()=>addPost(input)}>Create</button>
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
                <div className="Input__button" onClick={() => setPostMenu(true)}>
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