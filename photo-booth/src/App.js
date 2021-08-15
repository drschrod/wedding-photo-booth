import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import PhotoBooth from './components/PhotoBooth';
import BacksidePreview from './components/BacksidePreview';
  
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
