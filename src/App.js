import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

//COMPONENTS
import {Navigation, ChildHeader} from './components/Navigation_Bar';
import {AdsTopHeader} from './components/Header/AdsTopHeader';

//VIEWS
import Home from './views/Home';
import Confession from './views/Confession';
import PostPreview from './views/PostPreview';
import Market from './views/Market';
import RedirectView from './views/Redirect';
import Lixi from './views/Lixi';
import Test from './views/Test';

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
  }

  message = "HELLO";
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
          <Switch>
            <Route exact path='/test' component={Test}/>
            <Route exact path='/lixi/:id' component ={Lixi}/>
            <Route exact path='/confession/:id' component={Confession}/>
            <Route path='/post/:post_id' component={PostPreview}/>
            <Route path='/market/:page' component={Market}/>
            <Route path='/' component={Home}/>
          </Switch>
        </main>
      )
  }
}

export default App;