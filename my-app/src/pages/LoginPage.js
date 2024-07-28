import React, { useEffect, useState } from "react";
import ApiConnection from "../ApiConnection";

const LoginPage = () => {

  const apiConnection = new ApiConnection();

  const [registerMenu,setRegisterMenu] = useState(false);

  const [modelUser,setModelUser] = useState({
    userName: '',
    password: ''
  });

  const [user,setUser] = useState(modelUser);

  const [registerUser,setRegisterUser] = useState(modelUser);

  function registerWindow() {
    return (
        <div className="Popup">
            <div className="Box">
                <div className="Popup_Input">
                  <div className="Popup_Title">Username</div>
                  <input className="Popup_Box" type="text" name="userName" value={registerUser.userName} onChange={(e) => handleChange(e,registerUser,setRegisterUser)}/>
                </div>
                <div className="Popup_Input">
                  <div className="Popup_Title">Password</div>
                  <input className="Popup_Box" type="password" name="password" value={registerUser.password} onChange={(e) => handleChange(e,registerUser,setRegisterUser)}/>
                </div>
                <div  className="Popup_Button">
                    <button className="btn-delete" onClick={()=>register()}>Register</button>
                    <button className="btn-close" onClick={()=>setRegisterMenu(false)}>Close</button>
                </div>
            </div>
        </div>
    )
  }

  async function login() {
    if(user.userName != undefined && user.password != undefined) {
      let data = await apiConnection.postData("http://localhost:3000/authen/login",user);
      console.log(data)
    }
  }

  async function register() {
    if(registerUser.userName != undefined && registerUser.password != undefined) {
      let preRegister = {...registerUser,created: new Date(),modified: new Date()}
      let data = await apiConnection.postData("http://localhost:3000/authen/sign-up",preRegister);
      if(data != undefined) {
        setRegisterMenu(false);
      }
    }
  }

  function handleChange(event,model,set) {
    set({...model,[event.target.name] : event.target.value});
  }

  useEffect(()=> {
    setRegisterUser(modelUser);
  },[registerMenu])

  return (
    <div className="login-window">
        {registerMenu && registerWindow()}
        <div>
            Login
        </div>
        <div className="">
          <input type="text" name="userName" value={user.title} onChange={(e) => handleChange(e,user,setUser)}/>
          <input type="password" name="password" value={user.password} onChange={(e) => handleChange(e,user,setUser)}/>
        </div>
        <button onClick={()=>login()}>Login</button>
        <div onClick={()=>setRegisterMenu(true)}>Register New User</div>
    </div>
  );
};

export default LoginPage;