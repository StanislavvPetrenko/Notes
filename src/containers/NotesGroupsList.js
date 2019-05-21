import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getGroupsCollection } from '../store/notesgroups';
import { selectNotesGroupsData, selectNotesGroupsLoading } from '../store/notesgroups';

class NotesGroupsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: ''
    }
  };

  componentDidMount() {
    const { getGroupsCollection } = this.props;
    getGroupsCollection();
  };

  render() {
    const { notesGroupsData, loading } = this.props;

    return (
      <div>
        <h2>Notes Groups</h2>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  notesGroupsData: selectNotesGroupsData(state),
  loading: selectNotesGroupsLoading(state)
});

const mapDispatchToProps = {
  getGroupsCollection: getGroupsCollection
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesGroupsList);