import React, {Component} from 'react';
import './App.css';

import { BrowserRouter as Router} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <div className='main-page'>
            <MainPage/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
