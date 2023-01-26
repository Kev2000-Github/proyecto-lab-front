import React from 'react';
import { HomePage } from '../pages/Home'
import { BrowserRouter, Route } from 'react-router-dom';
import { ItemPage } from '../pages/Item';
import './index.scss'
import { QueryClient, QueryClientProvider } from 'react-query';

function App() { 
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/medicinas" component={ItemPage}/>
      </BrowserRouter>
      </QueryClientProvider>
    );
}
export default App;