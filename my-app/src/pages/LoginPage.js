import React, { useEffect, useState } from "react";
import ApiConnection from "../ApiConnection";
import LoginWindow from "../components/Login/LoginWindow";
import RegisterWindow from "../components/Login/RegisterWindow";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const apiConnection = new ApiConnection();
  const navigate = new useNavigate();

  const [registerMenu,setRegisterMenu] = useState(false);

  const [modelUser,setModelUser] = useState({
    userName: '',
    password: ''
  });

  useEffect(() => {
    if(!apiConnection.isTokenExpired(localStorage.getItem('accessToken'))) {
      navigate('/');
    }
  },[])

  return (
    <div className="login-page">
      {registerMenu && (<RegisterWindow setRegisterMenu = {setRegisterMenu} modelUser={modelUser}/>)}
      {!registerMenu && (<LoginWindow setRegisterMenu = {setRegisterMenu} modelUser={modelUser}/>)}
    </div>
  );
};

export default LoginPage;