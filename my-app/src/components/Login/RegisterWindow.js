import { useState } from "react";
import ApiConnection from "../../ApiConnection";

const RegisterWindow = ({setRegisterMenu,modelUser}) => {

  const apiConnection = new ApiConnection();

  const [registerUser,setRegisterUser] = useState(modelUser);

  function handleChange(event,model,set) {
      set({...model,[event.target.name] : event.target.value});
  }

  async function register() {
    if(registerUser.userName !== undefined && registerUser.password !== undefined) {
      let preRegister = {...registerUser,created: new Date(),modified: new Date()}
      let data = await apiConnection.authen("http://localhost:3000/authen/sign-up",preRegister);
      if(data !== undefined) {
        setRegisterMenu(false);
      }
    }
  }
  
  return (
      <div>
        <div className="login-header">REGISTER</div>
        <div className="login-window">
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
  )
}

export default RegisterWindow;