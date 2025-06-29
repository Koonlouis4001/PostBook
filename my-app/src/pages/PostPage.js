import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import '../App.css';

import Input from '../components/Post/Input';
import Post from '../components/Post/Post';
import ApiConnection from '../ApiConnection';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';


function PostPage() {
  const navigate = new useNavigate();
  
  const [posts,setPosts] = useState([]);
  const initialized = useRef(false);

  const apiConnection = new ApiConnection();
  const [userId,profileId] = apiConnection.getTokenData(localStorage.getItem('accessToken'));

  const [pagination,setPagination] = useState({
    page: 1,
    row: 10,
  })

  const paginationPosts = async () => {
    let data = await apiConnection.postData(`posts/pagination/`,pagination);
    if(data?.message === undefined || data?.message === null) {
      setPosts((prevPosts) => {
        const newPosts = data.filter((d) => !prevPosts.includes(d));
        return [...prevPosts, ...newPosts];
      });
    }
  }

  const addPost = (post) => {
    setPosts((prevPosts) => {
      return [{id: post.id, title: post.title, created: post.created, modified: post.modified, profile: post.profile, likes: post.likes}, ...prevPosts];
    });
  }

  const updatePost = (post) => {
    setPosts((prevPosts) => {
      return prevPosts.map((p) => {
        if(p.id === post.id) {
          return {id: post.id, title: post.title, created: post.created, modified: post.modified, profile: p.profile, likes: post.likes};
        }
        return p;
      });
    });
  }

  const removePost =  (id) => {
    setPosts((prevPosts) => {
      return prevPosts.filter((p) => p.id !== id);
    });
  }

  const nextPage = async () => {
    setPagination((prevPagination) => {
      return {...prevPagination, page: prevPagination.page + 1};
    });
  }

  useEffect(()=> {
    if(!initialized.current) {
      paginationPosts();
      initialized.current = true;
    }
  },[])

  useEffect(()=> {
    if(pagination.page === 1) {
      return;
    }
    paginationPosts();
  },[pagination])

  // useEffect(()=> {
  //   console.log("Posts updated:", posts);
  // },[posts])

  useEffect(() => {
    if(profileId === undefined || profileId === null) {
      //console.log("register required");
      navigate('/register');
    }
  },[userId,profileId]);

  return (
    <Context.Provider value={{userId,profileId}}>
      <div className="post-page">
        <Input addPost={addPost}/>
        {/* <button className="btn btn-primary" onClick={nextPage}>Next Page</button> */}
        <div className="post-container">
          {posts?.map((post) => (<Post post={post} updatePost={updatePost} removePost={removePost} key={post?.id}/>))}
          <button className='next-post-button' onClick={() => nextPage()}>next post</button>
        </div>
      </div>
    </Context.Provider>
  );
}

export default PostPage;
