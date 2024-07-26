import React, { useEffect, useState } from "react";
import ApiConnection from "../ApiConnection";

const LoginPage = () => {

  const apiConnection = new ApiConnection();

  const [registerMenu,setRegisterMenu] = useState(false);

  const [user,setUser] = useState({
    userName: '',
    password: ''
  });

  const [registerUser,setRegisterUser] = useState({
    userName: '',
    password: ''
  });

  function registerWindow() {
    return (
        <div className="Popup">
            <div className="Box">
                <div className="Popup_Input">
                  <div className="Popup_Title">Username</div>
                  <input className="Popup_Box" type="text" name="userName" value={registerUser.title} onChange={(e) => handleChange(e,registerUser)}/>
                </div>
                <div className="Popup_Input">
                  <div className="Popup_Title">Password</div>
                  <input className="Popup_Box" type="password" name="password" value={registerUser.title} onChange={(e) => handleChange(e,registerUser)}/>
                </div>
                <div  className="Popup_Button">
                    <button className="btn-delete" onClick={()=>register()}>Register</button>
                    <button className="btn-close" onClick={()=>setRegisterMenu(false)}>Close</button>
                </div>
            </div>
        </div>
    )
  }

  async function register() {
    if(registerUser.userName != undefined && registerUser.password != undefined) {
      let data = await apiConnection.postData("http://localhost:3000/user/",registerUser);
      console.log(data);
    }
  }

  function handleChange(event,model) {
    setUser({...model,[event.target.name] : event.target.value});
  }

  useEffect(()=> {
    console.log(user);
  },[user])

  return (
    <div className="login-window">
        {registerMenu && registerWindow()}
        <div>
            Login
        </div>
        <div className="">
          <input type="text" name="userName" value={user.title} onChange={(e) => handleChange(e,user)}/>
          <input type="password" name="password" value={user.password} onChange={(e) => handleChange(e,user)}/>
        </div>
        <div onClick={()=>setRegisterMenu(true)}>Register New User</div>
    </div>
  );
};

export default LoginPage;