import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import PhotoBooth from './components/frontDisplay/PhotoBooth';
import BacksidePreview from './components/backDisplay/BacksidePreview';
  
export default function App() {
  return (
    <div>
        <Switch>
            <Route path="/front" name="Front" component={PhotoBooth} />
            <Route path="/back" name="Back" component={BacksidePreview} />
        </Switch>
      </div>
  );
}
