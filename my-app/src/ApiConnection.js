import axios from 'axios'

class ApiConnection {
  async getAllData(url) {
    let response = await axios.get(url,{headers: {'Content-Type': 'application/json'}});
    if(response.status == '200') {
      return response.data;
    }
  }

  async postData(url,data) {
    let response = await axios.post(url,data,{headers: {'Content-Type': 'application/json'}}).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    console.log(response);
    if(response.status == '200') {
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
