import { useState } from "react";
import Notification from "../Notification/Notification";
import ApiConnection from "../../ApiConnection";
import { useNavigate } from "react-router-dom";

const RegisterWindow = ({setRegisterMenu,modelUser}) => {

  const apiConnection = new ApiConnection();

  const [registerUser,setRegisterUser] = useState(modelUser);

  const [warning,setWarning] = useState();

  const navigate = new useNavigate;

  function handleChange(event,model,set) {
      set({...model,[event.target.name] : event.target.value});
  }

  async function register() {
    if(registerUser.userName !== undefined && registerUser.password !== undefined) {
      let data = await apiConnection.authen(`authen/sign-up`,registerUser);
      if(data?.message === undefined || data?.message === null) {
        navigate('/');
      }
      else {
        setWarning(data.message);
      }
    }
  }
  
  return (
      <div className="login-animation">
        <div className="login-header">REGISTER</div>
        <div className="login-window">
          <div className="d-flex flex-col gap-4">
            {
              <Notification warning={warning} setWarning={setWarning}/>
            }
            <div>
              <input className="login-input" type="text" name="userName" placeholder="username" value={registerUser.title} onChange={(e) => handleChange(e,registerUser,setRegisterUser)}/>
            </div>
            <div>
              <input className="login-input" type="password" name="password" placeholder="password" value={registerUser.password} onChange={(e) => handleChange(e,registerUser,setRegisterUser)}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <button className="login-button" onClick={()=>register()}>Register</button>
              <div className="login-text">
                Already have an user?&nbsp;
                <div className="register-text" onClick={()=>setRegisterMenu(false)}>Login</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default RegisterWindow;