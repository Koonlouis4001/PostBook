import React, { useState } from "react";
import PropTypes from "prop-types";
import ApiConnection from "../../ApiConnection";

const LoginWindow = ({setRegisterMenu,modelUser}) => {
  const apiConnection = new ApiConnection();

  const [user,setUser] = useState(modelUser);

  function handleChange(event,model,set) {
      set({...model,[event.target.name] : event.target.value});
  }

  async function login() {
    if(user.userName !== undefined && user.password !== undefined) {
      let data = await apiConnection.authen("http://localhost:3000/authen/login",user);
      console.log(data)
    }
  }
    
  return (
    <div className="login-animation">
      <div className="login-header">LOGIN</div>
      <div className="login-window">
        <div>
          <input className="login-input" type="text" name="userName" placeholder="username" value={user.title} onChange={(e) => handleChange(e,user,setUser)}/>
        </div>
        <div>
          <input className="login-input" type="password" name="password" placeholder="password" value={user.password} onChange={(e) => handleChange(e,user,setUser)}/>
        </div>
        {/*<button onClick={()=>getUserWithToken()}>UserData</button>*/}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <button className="login-button" onClick={()=>login()}>Login</button>
          <div className="login-text">
            Don't have an user?&nbsp;
            <div className="register-text" onClick={()=>setRegisterMenu(true)}>Register</div>
          </div>
        </div>
      </div>
    </div>
  )
}

LoginWindow.propTypes = {
  setRegisterMenu: PropTypes.func.isRequired
}

export default LoginWindow;