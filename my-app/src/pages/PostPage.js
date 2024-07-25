import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../App.css';

import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Post from '../components/Post';
import ApiConnection from '../ApiConnection';

function PostPage() {
  const [posts,setPosts] = useState([]);

  const apiConnection = new ApiConnection();

  const refreshPosts = async () => {
    let data = await apiConnection.getAllData("http://localhost:3000/posts/");
    console.log(data);
    if(data != undefined) {
      setPosts(data);
    }
  }

  const addPost = async (title) => {
    let datetime = new Date();
    const newPost = {"title": title,"created": datetime,"modified": datetime,"likes":0,"profile":1};
    let data = await apiConnection.postData("http://localhost:3000/posts/",newPost);
    console.log(data);
    refreshPosts();
  }

  const updatePost = async (post) => {
    let updatedPost = {...post,modified: new Date()}
    console.log(updatePost);
    let data = await apiConnection.patchData(`http://localhost:3000/posts/${post.id}`,updatedPost);
    console.log(data);
    refreshPosts();
  }

  const deletePost = async (id) => {
    let data = await apiConnection.deleteData(`http://localhost:3000/posts/${id}`);
    console.log(data);
    refreshPosts();
  }

  useEffect(()=> {
    if(posts.length == 0) {
      refreshPosts();
    }
  },[posts])

  return (
    <div className="App">
      <Input addPost={addPost}/>
      {posts?.map((post) => (<Post post={post} deletePost={deletePost} updatePost={updatePost} key={post?.id}/>))}
    </div>
  );
}

export default PostPage;
