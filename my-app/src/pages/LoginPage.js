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
  async function getUserWithToken() {
    let data = await apiConnection.getUserWithToken("http://localhost:3000/authen/profile");
    console.log(data)
  }

  async function login() {
    if(user.userName != undefined && user.password != undefined) {
      let data = await apiConnection.authen("http://localhost:3000/authen/login",user);
      console.log(data)
    }
  }

  async function register() {
    if(registerUser.userName != undefined && registerUser.password != undefined) {
      let preRegister = {...registerUser,created: new Date(),modified: new Date()}
      let data = await apiConnection.authen("http://localhost:3000/authen/sign-up",preRegister);
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
    <div className="login-page">
        {registerMenu && registerWindow()}
        <div className="login-window">
          <div>LOGIN</div>
          <div>
            <input className="login-input" type="text" name="userName" placeholder="username" value={user.title} onChange={(e) => handleChange(e,user,setUser)}/>
          </div>
          <div>
            <input className="login-input" type="password" name="password" placeholder="password" value={user.password} onChange={(e) => handleChange(e,user,setUser)}/>
          </div>
          {/*<button onClick={()=>getUserWithToken()}>UserData</button>*/}
          <div style={{display:"flex",alignItems:"center"}}>
            <button onClick={()=>login()}>Login</button>
            <div style={{marginLeft:"auto"}} onClick={()=>setRegisterMenu(true)}>Register New User</div>
          </div>
        </div>
    </div>
  );
};

export default LoginPage;