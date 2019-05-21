import React from 'react';
import { Link } from 'react-router-dom';

class NavigationPanel extends React.Component {

  render() {
    return (
      <nav>
        <Link to="/login">Login</Link> |
        <Link to="/registration">Registration</Link>
      </nav>
    );
  }
}

export default NavigationPanel;
