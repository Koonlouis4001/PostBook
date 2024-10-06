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
  const [posts,setPost] = useState([]);

  const [pagination,setPagination] = useState({
    page: 1,
    row: 10,
  })

  const getProfile = async () => {
    let profileData = await apiConnection.getData(`http://localhost:3000/profile/${id}`);
    let image = await apiConnection.getFile(`http://localhost:3000/profile/image/${id}`)
    if(image !== undefined) {
      var blobURL = URL.createObjectURL(image);
      setProfileImage(blobURL);
    }
    setProfile(profileData);
  }

  const refreshPosts = async () => {
    let postData = await apiConnection.postData(`http://localhost:3000/posts/pagination/profile/${id}`,pagination);
    console.log(postData);
    if(postData) {
      setPost(postData);
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
              <Post post={post} refreshPosts={refreshPosts} key={post?.id}/>
            ))}
          </div>
          
        </div>
    </div>
  );
}

export default ProfilePage;
