import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';

class SettingsPage extends React.Component {

  render() {
    return (
      <div className="note-container">
        <div className="note-header d-flex align-items-center" >
          <Link to="/">
            <Button type="primary">
              <Icon type="left" />
              Go back
            </Button>
          </Link>
          <div className="d-flex align-items-center">
            <h3 className="note-header-title">Settings</h3>
            <Icon className="note-header-icon color-default" type="setting" />
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsPage;