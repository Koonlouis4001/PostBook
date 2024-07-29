import React from "react";
import { Route, Routes } from "react-router-dom";
import PostPage from "./PostPage";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";
import ApiConnection from "../ApiConnection";

const MainPage = () => {
  const apiConnection = new ApiConnection();
  const isAuthen = apiConnection.isAuthen();

  console.log(window.location.pathname)
  if(!isAuthen && window.location.pathname != '/login') {
    window.location.pathname = '/login'
  }

  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/' element={<PostPage />} />
      <Route path='/profile/' element={<ProfilePage />} />
    </Routes>
  );
};

export default MainPage;