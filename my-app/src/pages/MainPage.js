import React from "react";
import { Route, Routes } from "react-router-dom";
import PostPage from "./PostPage";
import ProfilePage from "./ProfilePage";

const MainPage = () => {
  return (
    <Routes>
      <Route path='/' element={<PostPage />} />
      <Route path='/profile/' element={<ProfilePage />} />
    </Routes>
  );
};

export default MainPage;