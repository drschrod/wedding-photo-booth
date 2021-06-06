import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import PhotoBooth from './components/PhotoBooth';
import BacksidePreview from './components/BacksidePreview';

  
  export default function App() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/photobooth">Photobooth Page</Link>
              </li>
              <li>
                <Link to="/photo-previews">Preview Page</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/photobooth">
              <PhotoBooth />
            </Route>
            <Route path="/backside-previews">
              <BacksidePreview />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
