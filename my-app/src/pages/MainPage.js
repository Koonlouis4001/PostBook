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

  const Authentication = async () => {
    await apiConnection.isAuthen();
    setLoading(true);
  }

  useEffect(() => {
    (async () => {
      if(!initialized.current) {
        initialized.current = true;
        await Authentication();
      }
    })();
  },[])

  return loading ? (
    <Routes>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/' element={<PostPage />} />
      <Route path='/profile/' element={<ProfilePage />} />
      <Route path='/profile/:id' element={<ProfilePage />} />
    </Routes>
  ) :
  <div>LOADING</div>;
};

export default MainPage;