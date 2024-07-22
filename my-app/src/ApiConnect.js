import axios from 'axios'

class ApiConnect {
  async getAllData() {
    let response = await axios.get("http://localhost:3000/posts/",{headers: {'Content-Type': 'application/json'}});
    if(response.status == '200') {
      return response.data;
    }
  }

  async postData(post) {
    let response = await axios.post("http://localhost:3000/posts/",post,{headers: {'Content-Type': 'application/json'}});
    console.log(response);
    if(response.status == '200') {
      return response.data;
    }
  }
}

export default ApiConnect;
