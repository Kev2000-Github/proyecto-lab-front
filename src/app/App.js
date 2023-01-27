import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ItemPage } from "../pages/Item";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { EditItem } from "../pages/Item/EditItem.jsx";
import { CreateItem } from "../pages/Item/CreateItem";
import { Login } from "../pages/Login";
import { UserPage } from "../pages/User";
import { GroupPage } from "../pages/Group";
import { SubsidiaryPage } from "../pages/Subsidiary";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Route exact path="/drugs" component={ItemPage} />
        <Route path="/drugs/create" component={CreateItem} />
        <Route path="/drugs/edit/:id" component={EditItem} />
        <Route exact path="/" component={Login} />
        <Route exact path="/usuarios" component={UserPage} />
        <Route exact path="/grupos" component={GroupPage} />
        <Route exact path="/sucursales" component={SubsidiaryPage} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
