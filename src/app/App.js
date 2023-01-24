import React from 'react';
import { HomePage } from '../pages/Home'
import { BrowserRouter, Route } from 'react-router-dom';
import './index.scss'

function App() { 
  return (
      <BrowserRouter>
        <Route exact path="/" component={HomePage}/>
      </BrowserRouter>
    );
}
export default App;