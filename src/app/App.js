import React from 'react';
import "../components/MenuAdmin/index.scss";
import { HomePage } from '../pages/Home'
import { BrowserRouter, Route } from 'react-router-dom';

function App() { 
  return (
      <BrowserRouter>
        <Route exact path="/" component={HomePage}/>
      </BrowserRouter>
    );
}
export default App;