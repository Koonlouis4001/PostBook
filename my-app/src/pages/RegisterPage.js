import React, { useEffect, useState } from "react";
import ApiConnection from "../ApiConnection";
import ProfileRegisterWindow from "../components/Login/ProfileRegisterWindow";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const apiConnection = new ApiConnection();
  const navigate = new useNavigate();
  const [userId,profileId] = apiConnection.getTokenData(localStorage.getItem('accessToken'));
  const [loading,setLoading] = useState(true);
  const [modelProfile,setModelProfile] = useState({
    profileName: '',
    profileStatus: '',
    picture: '',
    userId: null,
  });

  useEffect(() => {
    if(userId !== undefined && userId !== null) {
      setModelProfile({ ...modelProfile, userId: userId });
      setLoading(false);
    }
  },[userId,profileId]);

  return (
    <div className="login-page">
      {!loading && <ProfileRegisterWindow modelProfile={modelProfile}/>}
    </div>
  );
};

export default RegisterPage;