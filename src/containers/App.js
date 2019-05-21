import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import {connect} from "react-redux";
import 'antd/dist/antd.css';
import { Spin } from 'antd';

import { history } from '../store';
import { selectAuthLoading, selectAuthUser, subscribeChangeUser } from '../store/authentication';
import Home from './Home';
import login from './LoginPage';
import RegistrationForm from './RegistrationPage';
import EditNote from './EditNote';
import NewNote from "./NewNote";

// const UserRoute = ({ user, ...props }) => {
//   if (user) {
//     return <Route {...props} />;
//   }
//   return <Redirect to="/login" />;
// };

const unauthorizedRoutes = ['/registration', '/login'];

const UserRoute = ({ user, ...props }) => {
  const isCurrentRouteUnauthorized = unauthorizedRoutes.includes(props.path);
  if (!user && !isCurrentRouteUnauthorized) {
    return <Redirect to="/login" />;
  } else if (user && isCurrentRouteUnauthorized) {
    return <Redirect to='/' />
  } else {
    return <Route {...props} />;
  }
};

const PrivateRoute = connect(
  state => ({
    user: selectAuthUser(state)
  }),
  null
)(UserRoute);

class App extends React.Component {

  componentDidMount() {
    const { subscribeChangeUser } = this.props;
    subscribeChangeUser();
    // console.log(this.props);
  }

  render () {
    const { userLoading } = this.props;

    if (userLoading) {
      // console.log(userLoading, 'Page is loading...');
      return <Spin size="large" tip="Loading..."/>;
    }
    // console.log(userLoading, 'Page load!');
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/login" component={login} />
          <PrivateRoute path="/registration" component={RegistrationForm}/>
          <PrivateRoute path="/notes/:id" component={EditNote} />
          <PrivateRoute path="/create-note" component={NewNote} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  userLoading: selectAuthLoading(state)
});

const mapDispatchToProps = {
  subscribeChangeUser: subscribeChangeUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

