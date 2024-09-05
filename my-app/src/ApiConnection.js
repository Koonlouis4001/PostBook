import axios from 'axios'
import { jwtDecode }from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



class ApiConnection {
  isTokenExpired(token) {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  async isAuthen() {
    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (this.isTokenExpired(token)) {
        if(this.isTokenExpired(refreshToken)) {
          localStorage.clear();
          if(window.location.pathname !== '/login'){
            window.location.pathname = '/login'
          }
        }
        else {
          await this.getNewAccessToken(`http://localhost:3000/authen/refresh`);
        }
      }
    } 
    else {
      localStorage.clear();
      if(window.location.pathname !== '/login'){
        window.location.pathname = '/login'
      }
    }
  }

  async getNewAccessToken(url) {
    let refreshToken = `Bearer ${localStorage.getItem('refreshToken')}`;
    let response = await axios.get(url,{headers: {'Content-Type': 'application/json',Authorization: refreshToken}}).catch(async function (error) {
      localStorage.clear();
      if(window.location.pathname !== '/login'){
        window.location.pathname = '/login';
      }
    });
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
    let response = await axios.post(url,data,{headers: {'Content-Type': 'application/json'}}).catch(function (error) {
      return(error.response);
    });
    if(response?.data && response?.status !== 401) {
      await this.tokenToData(response);
    }
    return response?.data;
  }

  getTokenData(accessToken) {
    const decodeToken = jwtDecode(accessToken);
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
    if(decodeToken.profileId !== null && decodeToken.profileId !== undefined) {
      const profileImage = await this.getFile(`http://localhost:3000/profile/image/${decodeToken.profileId}`);
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
    let response = await axios.get(url,{headers: {'Content-Type': 'multipart/form-data',Authorization: authorizationToken},responseType: "blob"}).catch(async function (error) {
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
    let response = await axios.get(url,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response);
    });
    return response?.data;
  }

  async postData(url,data) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.post(url,data,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
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
    let response = await axios.post(url,formData,{headers: {'Content-Type': 'multipart/form-data',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response?.data);
    });
    return response;
  }

  async patchData(url,data) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.patch(url,data,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response?.data);
    });
    return response;
  }

  async deleteData(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.delete(url,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response);
    });
    return response?.data;
  }
}

export default ApiConnection;
