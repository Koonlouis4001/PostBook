import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import '../App.css';

import Navbar from '../components/Navbar';
import Input from '../components/Post/Input';
import Post from '../components/Post/Post';
import ApiConnection from '../ApiConnection';

function PostPage() {
  const [posts,setPosts] = useState([]);
  const [postMenu,setPostMenu] = useState(false);
  const initialized = useRef(false);

  const apiConnection = new ApiConnection();

  const refreshPosts = async () => {
    let data = await apiConnection.getData("http://localhost:3000/posts/");
    if(data?.message === undefined || data?.message === null) {
      setPosts(data);
    }
  }

  const addPost = async (input) => {
    if(localStorage.getItem('profileId')) {
      let data = await apiConnection.postDataWithFile(`http://localhost:3000/posts/upload/${localStorage.getItem('profileId')}`,input);
      setPostMenu(false);
      refreshPosts();
    }
    else {
      console.log("profile id is null or undefined");
    }
  }

  const updatePost = async (post) => {
    let updatedPost = {...post,modified: new Date()}
    let data = await apiConnection.patchData(`http://localhost:3000/posts/${post.id}`,updatedPost);
    refreshPosts();
  }

  const deletePost = async (id) => {
    let data = await apiConnection.deleteData(`http://localhost:3000/posts/${id}`);
    refreshPosts();
  }

  useEffect(()=> {
    if(posts.length === 0 && !initialized.current) {
      initialized.current = true;
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
