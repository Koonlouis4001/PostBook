import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import '../App.css';

import Navbar from '../components/Navbar';
import Input from '../components/Post/Input';
import Post from '../components/Post/Post';
import ApiConnection from '../ApiConnection';
import { Context } from '../Context';


function PostPage() {
  const [posts,setPosts] = useState([]);
  const initialized = useRef(false);

  const apiConnection = new ApiConnection();
  const [userId,profileId] = apiConnection.getTokenData(localStorage.getItem('accessToken'));

  const refreshPosts = async () => {
    let data = await apiConnection.getData("http://localhost:3000/posts/");
    if(data?.message === undefined || data?.message === null) {
      setPosts(data);
    }
  }

  useEffect(()=> {
    if(posts.length === 0 && !initialized.current) {
      initialized.current = true;
      refreshPosts();
    }
  },[])

  return (
    <Context.Provider value={{userId,profileId}}>
      <div className="Post__page">
        <Input refreshPosts={refreshPosts}/>
        {posts?.map((post) => (<Post post={post} refreshPosts={refreshPosts} key={post?.id}/>))}
      </div>
    </Context.Provider>
  );
}

export default PostPage;
