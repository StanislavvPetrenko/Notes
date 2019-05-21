import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Typography } from 'antd';
import NavigationPanel from './NavigationPanel';
import NotesList from './NotesList';
import NotesGroupsList from './NotesGroupsList';
import { selectAuthLoading, selectAuthUser, signOut } from '../store/authentication';

class Home extends React.Component {

  render() {
    const { Paragraph } = Typography;
    const { user, signOut} = this.props;

    return (
      <React.Fragment>
        {user ? <Link to="#" onClick={signOut}>Log out</Link> : <NavigationPanel />}
          <div className="wrap">
            <h1>Title</h1>
            <div className="content">
              <div className="content">
                <Paragraph>
                  Ant Design interprets the color system into two levels: a system-level color system and a
                  product-level color system.
                </Paragraph>
                <Paragraph>
                  Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
                  easier for designers to have a clear psychological expectation of color when adjusting colors,
                  as well as facilitate communication in teams.
                </Paragraph>
                <div className="extraContent">
                  <img
                    src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
                    alt="content"
                  />
                </div>
              </div>
            </div>
          </div>
        <div
          className="d-flex">
          <NotesGroupsList />
          <NotesList />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: selectAuthLoading(state),
  user: selectAuthUser(state)
});

const mapDispatchToProps = {
  signOut: signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
