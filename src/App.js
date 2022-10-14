import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Orios from "@orios";

//COMPONENTS
import {Navigation, ChildHeader} from './components/Navigation_Bar';
import {AdsTopHeader} from './components/Header/AdsTopHeader';
import Axios from 'axios';

//VIEWS
import Home from './views/Home';
import Feed from './views/Feed';
import PostPreview from './views/PostPreview';
import Market from './views/Market';
import RedirectView from './views/Redirect';
import Lixi from './views/Lixi';
import Test from './views/Test';

// Initialize Orios
const orios = Orios.initializeApp({
  app: "63452fa601a4792a134bf3f2"
})

class App extends Component {
  constructor(props) {
    super(props);

    //CHECK IF SYSTEM DARK MODE IS ENABLED
    if(!localStorage.getItem('dark_mode')) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.setItem('dark_mode', true);
      }
    }

    //ENABLE BODY DARK MODE
    if(localStorage.getItem('dark_mode') == 'true') {
      document.body.classList.add('dark');
    }

    //TRACK ANONYMOUSE USER
    if(!localStorage.getItem("@auid")) {
      this.trackUser();
    }
  }

  trackUser = async () => {
    let geo = await Axios.get('https://geolocation-db.com/json/');
    let uIP = geo.data.IPv4;
    localStorage.setItem("@auid", uIP);
  }

  render() {
    return (
      <div>
        <Navigation />
        <Main />
      </div>
    );
  }
}

class Main extends Component {
  render() {
      return (
        <main>
          <Routes>
            <Route exact path='/test' element={<Test/>}/>
            <Route exact path='/lixi/:id' element ={<Lixi/>}/>
            <Route exact path='/feed/:id' element={<Feed/>}/>
            <Route exact path='/post/:confessId' element={<PostPreview/>}/>
            <Route exact path='/market/:page' element={<Market/>}/>
            <Route exact path='/' element={<Home/>}/>
          </Routes>
        </main>
      )
  }
}

export default App;