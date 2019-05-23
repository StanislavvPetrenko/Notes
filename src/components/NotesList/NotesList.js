import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Empty, Icon, Spin } from 'antd';
import NotesListItem from './NotesListItem';

import { getNotesCollection, selectNotesListData, selectNotesListLoading, selectNotesListFilter } from '../../store/noteslist';

import './NotesList.css'

class NotesList extends React.Component {

  componentDidMount() {
    const { getNotesCollection } = this.props;
    getNotesCollection();
  }

  render() {
    const { notesData, notesFilter, loading } = this.props;
    let diplayNotesData = notesData;

    notesFilter.deleted === true ? diplayNotesData = notesData.filter((notes) => notes.deleted === true)
      :
    diplayNotesData = notesData.filter((notes) => notes.group === notesFilter.group && notes.deleted === false);

    return (
      <div className="notes-list">
        <div className="notes-list-header d-flex align-items-center">
          <h3 className="notes-list-header-title">Your notes</h3>
          <div className="notes-list-header-link">
            <Link to="/create-note">
              <button
                className="d-flex flex-nowrap align-items-center btn-add-file"
              >
                <Icon type="file-add" theme="twoTone"/>
                <span className="notes-list-header-add-text">Add new note</span>
              </button>
            </Link>
          </div>
        </div>
        {loading && <Spin/>}
        {!loading && (
          <div className="wrap content" >
            {diplayNotesData.length ?
              diplayNotesData.map(note => <NotesListItem key={note.id} {...note}/>)
              :
              <div className="notes-list-empty d-flex justify-content-center align-items-center">
                <Empty/>
              </div>
            }
          </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notesData: selectNotesListData(state),
  notesFilter: selectNotesListFilter(state),
  loading: selectNotesListLoading(state)
});

const mapDispatchToProps = {
  getNotesCollection: getNotesCollection
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
