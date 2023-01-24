import React from 'react';
import "../MenuAdmin/index.scss";
import Sidebar from "../MenuAdmin/Sidebar";
import SidebarAgente from '../MenuAgente/SidebarAgente';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() { 
  return (
    <div className="App">
    
    <Sidebar/>   
    </div>  
    );
}
export default App;