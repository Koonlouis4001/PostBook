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
  
  isAuthen() {
    if (localStorage.getItem('accessToken')) {
      const token = localStorage.getItem('accessToken');
      if (isTokenExpired(token)) {
        localStorage.removeItem('accessToken');
        window.location.pathname = '/login'
      }
    } 
    else {
      window.location.pathname = '/login'
    }
  }

  async getAuthorization() {
    this.isAuthen();
    console.log(localStorage.getItem('accessToken'));
    return `Bearer ${localStorage.getItem('accessToken')}`;
  }

  async authen(url,data) {
    let response = await axios.post(url,data,{headers: {'Content-Type': 'application/json'}}).catch(function (error) {
      return(error.response);
    });
    console.log(response);
    if(response?.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response?.data;
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
