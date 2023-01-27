import React from "react";
import { HomePage } from "../pages/Home";
import { BrowserRouter, Route } from "react-router-dom";
import { ItemPage } from "../pages/Item";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { EditItem } from "../pages/Item/EditItem.jsx";
import { CreateItem } from "../pages/Item/CreateItem";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/drugs" component={ItemPage} />
        <Route path="/drugs/create" component={CreateItem} />
        <Route path="/drugs/edit/:id" component={EditItem} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
