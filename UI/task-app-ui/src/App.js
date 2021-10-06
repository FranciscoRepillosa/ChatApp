import React from "react"
import {Route, Switch} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import TaskPage from "./pages/TaskPage/TaskPage.component";
import LoginPage from "./pages/LoginPage/LoginPageComponent";
import SignupPage from "./pages/SignUpPage/SignUpPage.component";
import NewCompanyPage from "./pages/NewCompanyPage/NewCompanyPage.component";
import CreateInvitationPage from "./pages/CreateInvitationPage/CreateInvitationPage.component ";
import InvitationPage from "./pages/InvitationPage/InvitationPage.component";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact={true} path="/task" component={TaskPage}/>        
          <Route exact={true} path="/login" component={LoginPage}/>
          <Route exact={true} path="/signup" component={SignupPage}/>
          <Route exact={true} path="/newCompany" component={NewCompanyPage}/> 
          <Route exact={true} path="/createInvitation" component={CreateInvitationPage}/>
          <Route exact={true} path="/invitations" component={InvitationPage}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
