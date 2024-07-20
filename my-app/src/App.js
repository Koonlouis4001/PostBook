import React, {useState} from 'react';
import './App.css';

import Navbar from './Navbar';
import Input from './Input';
import Post from './Post';

let id = 1;

function App() {
  const [posts,setPosts] = useState([]);

  function addPost(title) {
    const newPost = {"id": id,"title": title}
    setPosts([newPost,...posts]);
    id += 1
  }

  function deletePost(id) {
    const afterPosts = posts.filter((post) => (post.id != id))
    setPosts(afterPosts);
  }

  return (
    <div className="App">
      <Navbar/>
      <Input addPost={addPost}/>
      {posts.map((post) => (<Post title={post.title} id={post.id} deletePost={deletePost} key={post.id}/>))}
    </div>
  );
}

export default App;
