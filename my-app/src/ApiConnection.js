import axios from 'axios'

import { jwtDecode }from 'jwt-decode';

const isTokenExpired = (token) => {
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

class ApiConnection {
  
  async isAuthen() {
    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (isTokenExpired(token)) {
        if(isTokenExpired(refreshToken)) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          if(window.location.pathname !== '/login'){
            window.location.pathname = '/login'
          }
        }
        else {
          console.log("start refresh")
          await this.getNewAccessToken('http://localhost:3000/authen/refresh/1');
        }
      }
    } 
    else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      if(window.location.pathname !== '/login'){
        window.location.pathname = '/login'
      }
    }
  }

  async getNewAccessToken(url) {
    let refreshToken = `Bearer ${localStorage.getItem('refreshToken')}`;
    let response = await axios.get(url,{headers: {'Content-Type': 'application/json',Authorization: refreshToken}}).catch(async function (error) {
      if(window.location.pathname !== '/login'){
        window.location.pathname = '/login'
      }
    });
    if(response?.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
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
    if(response?.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response?.data;
  }

  async logout(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.get(url,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response);
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
    console.log(response);
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
    console.log(url)
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
      return(error.response);
    });
    return response?.data;
  }

  async patchData(url,data) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.patch(url,data,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.response);
    });
    return response?.data;
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
