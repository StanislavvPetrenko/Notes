import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { history } from './store';
import { selectAuthLoading, selectAuthUser, subscribeChangeUser} from './store/authentication';

import AppHeader from './components/AppHeader/AppHeader';
import HomePage from './pages/HomePage';
import login from './pages/LoginPage';
import RegistrationForm from './pages/RegistrationPage';
import EditNote from './pages/EditNotePage';
import NewNote from './pages/NewNote';


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
  }

  render () {
    const { userLoading } = this.props;
    return (
      userLoading ?
        <Spin size="large" tip="Loading..."/>
        :
        <ConnectedRouter history={history}>
          <AppHeader />
          <Switch>
            <PrivateRoute exact path="/" component={HomePage}/>
            <PrivateRoute path="/login" component={login}/>
            <PrivateRoute path="/registration" component={RegistrationForm}/>
            <PrivateRoute path="/notes/:id" component={EditNote}/>
            <PrivateRoute path="/create-note" component={NewNote}/>
            <PrivateRoute path="/settings"/>
            <Route path="*" component={() => (<div>404</div>)}/>
          </Switch>
        </ConnectedRouter>
    )
  }
}

const mapStateToProps = state => ({
  userLoading: selectAuthLoading(state)
});

const mapDispatchToProps = {
  subscribeChangeUser: subscribeChangeUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

