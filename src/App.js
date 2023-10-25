import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ListAssignment from "./components/ListAssignment";
import GradeAssignment from "./components/GradeAssignment";
import EditAssignment from "./components/EditAssignment";
import AddAssignment from "./components/AddAssignment";
import Login from "./components/Authentication/Login";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import Logout from "./components/Authentication/Logout";
import { useState } from "react";

function App() {
  const [authenticated, setAuth] = useState(
    sessionStorage.getItem("token") != null
  );

  return (
    <div className="App">
      {authenticated ? <Logout setAuth={setAuth} /> : ""}
      <h2>Gradebook</h2>
      <BrowserRouter>
        <div>
          <Switch>
            <ProtectedRoute exact path="/" component={ListAssignment} />
            <ProtectedRoute
              path="/gradeAssignment"
              component={GradeAssignment}
            />
            <ProtectedRoute path="/editAssignment" component={EditAssignment} />
            <ProtectedRoute path="/addAssignment" component={AddAssignment} />
            <Route path="/login">
              <Login setAuth={setAuth} />
            </Route>
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
