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
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        window.location.pathname = '/login'
      }
    } 
    else {
      window.location.pathname = '/login'
    }
  }

  async getAuthorization() {
    this.isAuthen();
    return `Bearer ${localStorage.getItem('token')}`;
  }

  async authen(url,data) {
    let response = await axios.post(url,data,{headers: {'Content-Type': 'application/json'}}).catch(function (error) {
      return(error);
    });
    console.log(response);
    if(response !== null || response !== undefined) {
      localStorage.setItem('token', response.data);
      return response.data;
    }
  }

  async getUserWithToken(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.get(url,{headers: { Authorization: authorizationToken}});
    console.log(response);
    return response;
  }

  async getFile(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.get(url,{headers: {'Content-Type': 'multipart/form-data',Authorization: authorizationToken},responseType: "blob"}).catch(error => {
      console.log(error);
      return undefined;
    });
    if(response === undefined) {
      return response;
    }
    if(response?.status === 200) {
      return response.data;
    }
  }

  async getData(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.get(url,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}});
    console.log(response);
    if(response.status === 200) {
      return response.data;
    }
  }

  async postData(url,data) {
    console.log(url)
    let authorizationToken = await this.getAuthorization();
    let response = await axios.post(url,data,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}}).catch(function (error) {
      return(error.toJSON());
    });
    console.log(response);
    if(response !== null || response !== undefined) {
      return response.data;
    }
  }

  async postDataWithFile(url,data) {
    let authorizationToken = await this.getAuthorization();
    var formData = new FormData();
    for(let key in data) {
      formData.append(key,data[key])
    }
    let response = await axios.post(url,formData,{headers: {'Content-Type': 'multipart/form-data',Authorization: authorizationToken}}).catch(error => {
      console.error(error);
    });
    console.log(response);
    if(response === undefined) {
      return response;
    }
    if(response?.status === 200) {
      return response.data;
    }
  }

  async patchData(url,data) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.patch(url,data,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}});
    console.log(response);
    if(response.status === '200') {
      return response.data;
    }
  }

  async deleteData(url) {
    let authorizationToken = await this.getAuthorization();
    let response = await axios.delete(url,{headers: {'Content-Type': 'application/json',Authorization: authorizationToken}});
    console.log(response);
    if(response.status === '204') {
      return response.data;
    }
  }
}

export default ApiConnection;
