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
import { Sidebar } from "../components/Menu";
import { getRol } from "../utils/helper";

const sideBarHOC = (Component) => (props) => {
  return (
    <div className="mainBody">
      <Sidebar type={getRol()}/>
      <Component {...props}/>
    </div>
  )
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/drugs" component={sideBarHOC(ItemPage)} />
        <Route exact path="/drugs/create" component={sideBarHOC(CreateItem)} />
        <Route exact path="/drugs/edit/:id" component={sideBarHOC(EditItem)} />
        <Route exact path="/users" component={sideBarHOC(UserPage)} />
        <Route exact path="/users/create" component={sideBarHOC(CreateUser)} />
        <Route exact path="/users/edit/:id" component={sideBarHOC(EditUser)} />
        <Route exact path="/groups" component={sideBarHOC(GroupPage)} />
        <Route exact path="/groups/create" component={sideBarHOC(CreateGroup)} />
        <Route exact path="/groups/edit/:id" component={sideBarHOC(EditGroup)} />
        <Route exact path="/subsidiaries" component={sideBarHOC(SubsidiaryPage)} />
        <Route exact path="/subsidiaries/edit/:id" component={sideBarHOC(EditSubsidiary)} />
        <Route exact path="/subsidiaries/create" component={sideBarHOC(CreateSubsidiary)} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
