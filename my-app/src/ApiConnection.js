import axios from 'axios'

class ApiConnection {
  isAuthen() {
    if(localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }

  async authen(url,data) {
    let response = await axios.post(url,data,{headers: {'Content-Type': 'application/json'}}).catch(function (error) {
      return(error.toJSON());
    });
    console.log(response);
    if(response != null || response != undefined) {
      localStorage.setItem('token', response.data);
      return response.data;
    }
  }

  async getUserWithToken(url) {
    console.log(localStorage.getItem('token'));
    let response = await axios.get(url,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
    console.log(response);
    return response;
  }

  async getData(url) {
    let response = await axios.get(url,{headers: {'Content-Type': 'application/json'}});
    if(response.status == '200') {
      return response.data;
    }
  }

  async postData(url,data) {
    let response = await axios.post(url,data,{headers: {'Content-Type': 'application/json'}}).catch(function (error) {
      return(error.toJSON());
    });
    console.log(response);
    if(response != null || response != undefined) {
      return response.data;
    }
  }

  async patchData(url,data) {
    let response = await axios.patch(url,data,{headers: {'Content-Type': 'application/json'}});
    console.log(response);
    if(response.status == '200') {
      return response.data;
    }
  }

  async deleteData(url) {
    let response = await axios.delete(url,{headers: {'Content-Type': 'application/json'}});
    console.log(response);
    if(response.status == '204') {
      return response.data;
    }
  }
}

export default ApiConnection;
