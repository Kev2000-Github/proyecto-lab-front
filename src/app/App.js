import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ItemPage } from "../pages/Item";
import { QueryClient, QueryClientProvider } from "react-query";
import { EditItem } from "../pages/Item/EditItem.jsx";
import { CreateItem } from "../pages/Item/CreateItem";
import { Login } from "../pages/Login";
import { UserPage } from "../pages/User";
import { GroupPage } from "../pages/Group";
import { SubsidiaryPage } from "../pages/Subsidiary";
import "./index.scss";
import { EditSubsidiary } from "../pages/Subsidiary/EditSubsidiary";
import { CreateSubsidiary } from "../pages/Subsidiary/CreateSubsidiary";
import { CreateGroup } from "../pages/Group/CreateGroup";
import { EditGroup } from "../pages/Group/EditGroup";
import { CreateUser } from "../pages/User/CreateUser";
import { EditUser } from "../pages/User/EditUser";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/drugs" component={ItemPage} />
        <Route exact path="/drugs/create" component={CreateItem} />
        <Route exact path="/drugs/edit/:id" component={EditItem} />
        <Route exact path="/users" component={UserPage} />
        <Route exact path="/users/create" component={CreateUser} />
        <Route exact path="/users/edit/:id" component={EditUser} />
        <Route exact path="/groups" component={GroupPage} />
        <Route exact path="/groups/create" component={CreateGroup} />
        <Route exact path="/groups/edit/:id" component={EditGroup} />
        <Route exact path="/subsidiaries" component={SubsidiaryPage} />
        <Route exact path="/subsidiaries/edit/:id" component={EditSubsidiary} />
        <Route exact path="/subsidiaries/create" component={CreateSubsidiary} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
