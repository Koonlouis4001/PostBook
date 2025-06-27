import React, {useContext, useEffect, useState} from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import ApiConnection from '../ApiConnection';
import { Context } from '../Context';
import defaultUser from '../image/defaultUser.png'
import Post from '../components/Post/Post';
import moment from 'moment';

function ProfilePage() {
  const apiConnection = new ApiConnection();
  const [userId,profileId] = apiConnection.getTokenData(localStorage.getItem('accessToken'));
  const {id} = useParams();
  const navigate = useNavigate();
  const [profile,setProfile] = useState();
  const [profileImage,setProfileImage] = useState();
  const [posts,setPosts] = useState([]);

  const [pagination,setPagination] = useState({
    page: 1,
    row: 10,
  })

  const updatePost = (post) => {
    //console.log("Post updated:", post);
    setPosts((prevPosts) => {
      return prevPosts.map((p) => {
        if(p.id === post.id) {
          return {id: post.id, title: post.title, created: post.created, modified: post.modified, profile: p.profile, likes: post.likes};
        }
        return p;
      });
    });
  }

  const removePost =  (postId) => {
    //console.log("Post remove:", postId);
    setPosts((prevPosts) => {
      return prevPosts.filter((p) => p.id !== postId);
    });
  }

  const getProfile = async () => {
    if(id === undefined || id === null) {
      return;
    }
    let profileData = await apiConnection.getData(`profile/${id}`);
    let image = await apiConnection.getFile(`profile/image/${id}`);
    if(image !== undefined) {
      var blobURL = URL.createObjectURL(image);
      setProfileImage(blobURL);
    }
    setProfile(profileData);
  }

  const refreshPosts = async () => {
    let postData = await apiConnection.postData(`posts/pagination/profile/${id}`,pagination);
    //console.log("Posts data:", postData);
    if(postData) {
      setPosts(postData);
    }
  }

  useEffect(()=> {
    if(id !== undefined) {
      getProfile();
      refreshPosts();
    }
    else if (profileId !== undefined){
      setProfileImage();
      navigate(`/profile/${profileId}`);
    }
  },[id])

  useEffect(()=> {
    console.log(posts,posts?.length);
  },[posts])

  return (
    <div className="app">
      <h1 style={{textAlign:"center"}}>PROFILE PAGE</h1>
        <h2 style={{textAlign:"center"}}>PROFILE</h2>
        <div className='d-flex profile-box'>
          <img className='profile-image' src={profileImage ? profileImage : defaultUser}/>
          <div className='d-flex profile-status'>
            <div>
              <div>Profile ID : {profile?.id ? profile?.id : 'Loading'}</div>
              <div>Profile Name : {profile?.profileName ? profile?.profileName : 'Loading'}</div>
              <div>Profile Status : {profile?.profileStatus ? profile?.profileStatus : 'Loading'}</div>
              <div>Profile Created : {profile?.created ? moment(profile?.created).format("DD-MM-YYYY HH:mm:ss.SSS") : 'Loading'}</div>
              <div>Profile Last Modified : {profile?.modified ? moment(profile?.modified).format("DD-MM-YYYY HH:mm:ss.SSS") : 'Loading'}</div>
            </div>
          </div>
        </div>
        <div>
          <h2 style={{textAlign:"center"}}>PROFILE'S POST</h2>
          <div className='post-page'>
            {posts?.map((post) => (
              <Post post={post} updatePost={updatePost} removePost={removePost} key={post?.id}/>
            ))}
          </div>
          
        </div>
    </div>
  );
}

export default ProfilePage;
