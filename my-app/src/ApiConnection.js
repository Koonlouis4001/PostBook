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
