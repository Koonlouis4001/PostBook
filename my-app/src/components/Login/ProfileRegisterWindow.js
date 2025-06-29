import { useEffect, useState } from "react";
import Notification from "../Notification/Notification";
import ApiConnection from "../../ApiConnection";
import { useNavigate } from "react-router-dom";

const ProfileRegisterWindow = ({modelProfile}) => {

  const apiConnection = new ApiConnection();

  const [registerProfile,setRegisterProfile] = useState(modelProfile);

  const [warning,setWarning] = useState();

  const navigate = new useNavigate;

  function handleChange(event,model,set) {
    if(event.target.type === "file") {
      set({...model,[event.target.name] : event.target.files[0]});
    }
    else {
      set({...model,[event.target.name] : event.target.value});
    }
  }

  async function register() {
    if(registerProfile.profileName !== undefined && registerProfile.profileName.trim() !== "") {
      //console.log(registerProfile);
      let data = await apiConnection.postData("profile",registerProfile);
      //console.log(data);
      if(data?.message === undefined || data?.message === null) {
        await apiConnection.getNewAccessToken(`authen/refresh`);
        navigate('/');
      }
      else {
        setWarning(data.message);
      }
    }
  }

  // useEffect(() => {
  //   console.log(registerProfile);
  // }, [registerProfile]);
  
  return (
      <div className="login-animation">
        <div className="login-header">REGISTER PROFILE</div>
        <div className="login-window">
          <div className="d-flex flex-col gap-4">
            {
              <Notification warning={warning} setWarning={setWarning}/>
            }
            <div>
              <input className="login-input" type="text" name="profileName" placeholder="Profile Name" value={registerProfile.profileName} onChange={(e) => handleChange(e,registerProfile,setRegisterProfile)}/>
            </div>
            <div>
              <input className="login-input" type="text" name="profileStatus" placeholder="Profile Status" value={registerProfile.profileStatus} onChange={(e) => handleChange(e,registerProfile,setRegisterProfile)}/>
            </div>
            {/* <div>
              <input type="file" name="picture" onChange={(e) => handleChange(e,registerProfile,setRegisterProfile)}/>
            </div> */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <button className="login-button" onClick={()=>register()}>Register</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProfileRegisterWindow;