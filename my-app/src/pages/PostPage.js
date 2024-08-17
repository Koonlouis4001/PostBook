import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../App.css';

import Navbar from '../components/Navbar';
import Input from '../components/Post/Input';
import Post from '../components/Post/Post';
import ApiConnection from '../ApiConnection';

function PostPage() {
  const [posts,setPosts] = useState([]);
  const [postMenu,setPostMenu] = useState(false);

  const apiConnection = new ApiConnection();

  const refreshPosts = async () => {
    let data = await apiConnection.getData("http://localhost:3000/posts/");
    console.log(data);
    if(data?.message === undefined || data?.message === null) {
      setPosts(data);
    }
  }

  const addPost = async (input) => {
    let data = await apiConnection.postDataWithFile("http://localhost:3000/posts/upload/1",input);
    setPostMenu(false);
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
    if(posts.length === 0) {
      refreshPosts();
    }
  },[])

  return (
    <div className="Post__page">
      <Input addPost={addPost} postMenu={postMenu} setPostMenu={setPostMenu}/>
      {posts?.map((post) => (<Post post={post} deletePost={deletePost} updatePost={updatePost} key={post?.id}/>))}
    </div>
  );
}

export default PostPage;
