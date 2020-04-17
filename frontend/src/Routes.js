import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Coctails from "./containers/Coctails/Coctails";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewCoctail from "./containers/NewCoctail/NewCoctail";
import CoctailPage from "./containers/CoctailPage/CoctailPage";
import UserProfileForm from "./components/UI/Form/UserProfileForm";
import UserProfile from "./containers/UserProfile/UserProfile";

const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/login" />;

const Routes = () => {
  const user = useSelector((state) => state.users.user);

  return (
    <Switch>
      <Route path="/" exact component={Coctails} />
      <Route path="/coctails" exact component={Coctails} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <ProtectedRoute
        isAllowed={user}
        path="/profile/edit"
        exact
        component={UserProfileForm}
      />
      <ProtectedRoute
        isAllowed={user}
        path="/profile/"
        exact
        component={UserProfile}
      />
      <ProtectedRoute
        isAllowed={user}
        path="/coctails/new"
        exact
        component={NewCoctail}
      />
      <Route path="/coctails/:id" exact component={CoctailPage} />
    </Switch>
  );
};

export default Routes;
