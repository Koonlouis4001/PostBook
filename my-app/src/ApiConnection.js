import axios from 'axios'
import { jwtDecode }from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



class ApiConnection {
  isTokenExpired(token) {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      //console.log(decodedToken);
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  async isAuthen() {
    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
      const token = localStorage.getItem('accessToken');
      //console.log(token);
      const refreshToken = localStorage.getItem('refreshToken');
      //console.log(refreshToken);
      if (this.isTokenExpired(token)) {
        if(this.isTokenExpired(refreshToken)) {
          //console.log("refresh expired");
          localStorage.clear();
          if(window.location.pathname !== '/login'){
            window.location.pathname = '/login'
          }
        }
        else {
          await this.getNewAccessToken(`authen/refresh`);
        }
      }
    } 
    else {
      localStorage.clear();
      //console.log("no access token and refresh token found");
      if(window.location.pathname !== '/login'){
        window.location.pathname = '/login'
      }
    }
  }

  async getNewAccessToken(url) {
    let refreshToken = `Bearer ${localStorage.getItem('refreshToken')}`;
    let response = await axios.get(process.env.REACT_APP_SERVER_URL + url,{headers: {'Content-Type': 'application/json',Authorization: refreshToken}}).catch(async function (error) {
      console.log(error);
      localStorage.clear();
      if(window.location.pathname !== '/login'){
        window.location.pathname = '/login';
      }
    });
    //console.log(response);
    if(response?.data) {
      await this.tokenToData(response);
    }
    return response?.data;
  }

  async getAuthorization() {
    await this.isAuthen();
    return `Bearer ${localStorage.getItem('accessToken')}`;
  }

  async authen(url,data) {
    let response = await axios.post(process.env.REACT_APP_SERVER_URL + url,data,{headers: {'Content-Type': 'application/json'}}).then(async (res) => await this.tokenToData(res)).catch(function (error) {
      return(error.response);
    });
    return response?.data;
  }

  getTokenData(accessToken) {
    if(!accessToken) return [];
    const decodeToken = jwtDecode(accessToken);
    //console.log(decodeToken);
    return [decodeToken.id,decodeToken.profileId];
  }

  async tokenToData(tokenResponse) {
    localStorage.setItem('accessToken', tokenResponse.data.accessToken);
    localStorage.setItem('refreshToken', tokenResponse.data.refreshToken);
    const decodeToken = jwtDecode(tokenResponse.data.accessToken);
    //localStorage.setItem('userId',decodeToken.id);
    localStorage.setItem('userName',decodeToken.userName);
    //localStorage.setItem('profileId',decodeToken.profileId);
    localStorage.setItem('profileName',decodeToken.profileName);
    //console.log("Decode Token : " + decodeToken);
    if(decodeToken.profileId !== null && decodeToken.profileId !== undefined) {
      const profileImage = await this.getFile(`profile/image/${decodeToken.profileId}`);
      if(profileImage) {
        localStorage.setItem('profileImage',URL.createObjectURL(profileImage));
      }
    }
  }

  async logout(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.get(url,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response);
    });
    localStorage.clear();
  }

  /*async getUserWithToken(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.get(url,{headers: { Authorization: authorizationToken}});
    return response;
  }*/

  async getFile(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.get(process.env.REACT_APP_SERVER_URL + url,{headers: {'Content-Type': 'multipart/form-data',Authorization: authorizationToken},responseType: "blob"}).catch(async function (error) {
      let errorResponse = await (error.response.data.text());
      return(JSON.parse(errorResponse));
    });
    if(response?.data?.type !== 'application/octet-stream') {
      return;
    }
    return response?.data;
  }

  async getData(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.get(process.env.REACT_APP_SERVER_URL + url,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response);
    });
    return response?.data;
  }

  async postData(url,data) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.post(process.env.REACT_APP_SERVER_URL + url,data,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response);
    });
    return response?.data;
  }

  async postDataWithFile(url,data) {
    let authorizationToken = await this.getAuthorization();
    var formData = new FormData();
    for(let key in data) {
      formData.append(key,data[key])
    }
    let response = await axios.post(process.env.REACT_APP_SERVER_URL + url,formData,{headers: {'Content-Type': 'multipart/form-data',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response?.data);
    });
    return response;
  }

  async patchData(url,data) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.patch(process.env.REACT_APP_SERVER_URL + url,data,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response?.data);
    });
    return response;
  }

  async deleteData(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.delete(process.env.REACT_APP_SERVER_URL + url,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response);
    });
    return response?.data;
  }
}

export default ApiConnection;
