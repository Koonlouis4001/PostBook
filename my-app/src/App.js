import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './Navbar';
import Input from './Input';
import Post from './Post';
import ApiConnect from './ApiConnect';

let id = 1;

function App() {
  const [posts,setPosts] = useState([]);

  const apiConnect = new ApiConnect();

  const refreshPosts = async () => {
    let data = await apiConnect.getAllData();
    console.log(data);
    if(data != undefined) {
      setPosts(data);
    }
  }

  const addNewPost = async (post) => {
    let data = await apiConnect.postData(post);
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
    const afterPosts = posts.filter((post) => (post.id != id))
    setPosts(afterPosts);
  }

  return (
    <div className="App">
      <Navbar/>
      <Input addPost={addPost}/>
      {posts?.map((post) => (<Post title={post?.title} id={post?.id} deletePost={deletePost} key={post?.id}/>))}
    </div>
  );
}

export default App;
