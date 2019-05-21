import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Empty, Button, Spin } from 'antd';
import NotesListItem from './NotesListItem';
import AddNewGroup from './AddNewGroup';

import { getNotesCollection, selectNotesListData, selectNotesListLoading } from '../store/noteslist';

import './NotesList.css'


class NotesList extends React.Component {

  state = {
    body:''
  };

  componentDidMount() {
    const { getNotesCollection } = this.props;
    getNotesCollection();
  }

  render() {
    const { notesData, loading } = this.props;

    return (
      <div className="notes-list">
        <div className="notes-list-header d-flex justify-content-between align-items-center">
          <h2>Notes List</h2>
          <div>
            <span className="notes-list-add-text">Add new note</span>
            <Link to="/create-note">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm float-right"
              >
                <i className="fa fa-file" />
              </button>
            </Link>
          </div>
        </div>
        {loading && <Spin/>}
        {!loading && (
          <div className="wrap content" >
            {notesData.length ?
              notesData.map(note => <NotesListItem key={note.id} {...note}/>)
              :
              <Empty/>
            }
          </div>)
        }
        <div className="notes-list-header d-flex justify-content-end">
          <AddNewGroup />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notesData: selectNotesListData(state),
  loading: selectNotesListLoading(state)
});

const mapDispatchToProps = {
  getNotesCollection: getNotesCollection
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
