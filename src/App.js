import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Axios from 'axios';

// COMPONENTS
import { Navigation } from './components/Navigation_Bar';
import { AppLabel } from '@components';

// VIEWS
import Home from './views/Home';
import Feed from './views/Feed';
import PostPreview from './views/PostPreview';
import Market from './views/Market';
import Lixi from './views/Lixi';
import Test from './views/Test';

const Main = () => (
  <main>
    <AppLabel />
    <Routes>
      <Route exact path="/test" element={<Test />} />
      <Route exact path="/lixi/:id" element={<Lixi />} />
      <Route exact path="/feed/:id" element={<Feed />} />
      <Route exact path="/post/:confessId" element={<PostPreview />} />
      <Route exact path="/market/:page" element={<Market />} />
      <Route exact path="/" element={<Home />} />
    </Routes>
  </main>
);

const App = () => {
  useEffect(() => {
    // CHECK IF SYSTEM DARK MODE IS ENABLED
    if (!localStorage.getItem('dark_mode')) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.setItem('dark_mode', 'true');
      }
    }

    // ENABLE BODY DARK MODE
    if (localStorage.getItem('dark_mode') === 'true') {
      document.body.classList.add('dark');
    }

    // TRACK ANONYMOUS USER
    if (!localStorage.getItem('@auid')) {
      Axios.get('https://geolocation-db.com/json/')
        .then((geo) => {
          if (geo && geo.data && geo.data.IPv4) {
            localStorage.setItem('@auid', geo.data.IPv4);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div>
      <Navigation />
      <Main />
    </div>
  );
};

export default App;
