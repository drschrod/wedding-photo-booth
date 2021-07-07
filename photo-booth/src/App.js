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
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/front">
              <PhotoBooth />
            </Route>
            <Route exact path="/back">
              <BacksidePreview />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
