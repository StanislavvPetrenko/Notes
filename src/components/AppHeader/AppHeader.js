import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Dropdown, Row, Icon } from 'antd/lib/index';
import { signOut, selectAuthUser } from '../../store/authentication';
import './AppHeader.css';

class AppHeader extends React.Component {

  handleMenuClick = (e) => {
    if (e.key === "logout") {
      const { signOut } = this.props;
      signOut();
    }
  };

  render() {
    const { user } = this.props;
    const { Header } = Layout;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="settings">
          <Link to="/settings">
            <Row type="flex" align="middle">
              <Icon type="setting" />
              <span className="menu-btn-text">Settings</span>
            </Row>
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Row type="flex" align="middle">
            <Icon type="logout" />
            <span className="menu-btn-text">Log Out</span>
          </Row>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className="custom-header-container">
        <Row type="flex" justify="space-between" align="middle">
          <Link to="/">
            <h1 className="color-white">Black'note</h1>
          </Link>
          { user ?
            <div id="components-dropdown-demo-dropdown-button">
              <Dropdown.Button overlay={menu} icon={<Icon type="user" />}>
                <span>Welcome, {user.nickname}</span>
              </Dropdown.Button>
            </div>
            :
            <div>
              <Link className="header-nav-link" to="/login">
                Log In
              </Link>
              <Link className="header-nav-link" to="/registration">
                Registration
              </Link>
            </div>
          }
        </Row>
      </Header>
    )
  }
}

const mapStateToProps = state => ({
  user: selectAuthUser(state)
});

const mapDispatchToProps = {
  signOut: signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);