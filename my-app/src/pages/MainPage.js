import React from "react";
import { Route, Routes } from "react-router-dom";
import PostPage from "./PostPage";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";
import ApiConnection from "../ApiConnection";

const MainPage = () => {
  const apiConnection = new ApiConnection();

  if(window.location.pathname !== '/login') {
    apiConnection.isAuthen();
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