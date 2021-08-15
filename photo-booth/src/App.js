import React from 'react';
import {
    Switch,
    Route,
    Link,
  } from "react-router-dom";
import PhotoBooth from './components/PhotoBooth';
import BacksidePreview from './components/BacksidePreview';
  
export default function App() {
  const Dashboard = (<Route exact path="/">
    <div>
      <h1>No Route Specified</h1>
      <Link to={'./front'}>
        <button variant="raised">
            Front Window
        </button>
      </Link>
      <Link to={'./back'}>
        <button variant="raised">
            Back Window
        </button>
      </Link>
    </div>
  </Route>);
  return (
    <div>
        <Switch>
            <Route path="/front" name="Front" component={PhotoBooth} />
            <Route path="/back" name="Back" component={BacksidePreview} />
        </Switch>
      </div>
  );
}
