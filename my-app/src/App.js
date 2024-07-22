import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './Navbar';
import Input from './Input';
import Post from './Post';
import ApiConnection from './ApiConnection';

let id = 1;

function App() {
  const [posts,setPosts] = useState([]);

  const apiConnection = new ApiConnection();

  const refreshPosts = async () => {
    let data = await apiConnection.getAllData("http://localhost:3000/posts/");
    console.log(data);
    if(data != undefined) {
      setPosts(data);
    }
  }

  const addNewPost = async (post) => {
    let data = await apiConnection.postData("http://localhost:3000/posts/",post);
    console.log(data);
    refreshPosts();
  }

  const deleteSelectedPost = async (id) => {
    let data = await apiConnection.deleteData(`http://localhost:3000/posts/${id}`);
    console.log(data);
    refreshPosts();
  }

  useEffect(()=> {
    if(posts.length == 0) {
      refreshPosts();
    }
  },[posts])

  function addPost(title) {
    let datetime = new Date();
    const newPost = {"title": title,"created": datetime,"modified": datetime,"likes":0,"profile":1};
    addNewPost(newPost);
  }

  function deletePost(id) {
    deleteSelectedPost(id);
  }

  return (
    <div className="App">
      <Navbar/>
      <Input addPost={addPost}/>
      {posts?.map((post) => (<Post post={post} deletePost={deletePost} key={post?.id}/>))}
    </div>
  );
}

export default App;
