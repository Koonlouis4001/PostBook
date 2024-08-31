import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PostPage from "./PostPage";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";
import ApiConnection from "../ApiConnection";

const MainPage = () => {
  const apiConnection = new ApiConnection();
  const [loading,setLoading] = useState(false);
  const initialized = useRef(false)

  const isAuthen = async () => {
    await apiConnection.isAuthen();
    setLoading(true);
  }

  useEffect(() => {
    (async () => {
      if(!initialized.current) {
        initialized.current = true;
        await isAuthen();
      }
    })();
  },[])

  return loading ? (
    <Routes>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/' element={<PostPage />} />
      <Route path='/profile/' element={<ProfilePage />} />
    </Routes>
  ) :
  <div>LOADING</div>;
};

export default MainPage;