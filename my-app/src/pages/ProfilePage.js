import React, {useContext, useEffect, useState} from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import ApiConnection from '../ApiConnection';
import { Context } from '../Context';
import defaultUser from '../image/defaultUser.png'
import moment from 'moment';

function ProfilePage() {
  const apiConnection = new ApiConnection();
  const [userId,profileId] = apiConnection.getTokenData(localStorage.getItem('accessToken'));
  const {id} = useParams();
  const navigate = useNavigate();
  const [profile,setProfile] = useState();
  const [profileImage,setProfileImage] = useState();

  const getProfile = async () => {
    let profileData = await apiConnection.getData(`http://localhost:3000/profile/${id}`);
    let image = await apiConnection.getFile(`http://localhost:3000/profile/image/${id}`)
    if(image !== undefined) {
      var blobURL = URL.createObjectURL(image);
      setProfileImage(blobURL);
    }
    console.log(profile);
    setProfile(profileData);
  }

  useEffect(()=> {
    console.log(profileId);
    if(id !== undefined) {
      getProfile();
    }
    else if (profileId !== undefined){
      setProfileImage();
      navigate(`/profile/${profileId}`);
    }
  },[id])

  return (
    <div className="app">
      <h1>PROFILE PAGE</h1>
      {profile && 
        <div className='d-flex profile-box'>
          <img className='profile-image' src={profileImage ? profileImage : defaultUser}/>
          <div className='d-flex profile-status'>
            <div>
              <div>{profile.id}</div>
              <div>{profile.profileName}</div>
              <div>{profile.profileStatus}</div>
              <div>{profile.created && moment(profile.created).format("DD-MM-YYYY HH:mm:ss.SSS")}</div>
              <div>{profile.modified && moment(profile.modified).format("DD-MM-YYYY HH:mm:ss.SSS")}</div>
            </div>
          </div>
          
        </div>
      }
    </div>
  );
}

export default ProfilePage;
