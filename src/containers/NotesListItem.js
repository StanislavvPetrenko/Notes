import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import './NotesListItem.css'
import {handleDeleteNote} from '../store/noteslist';

class NotesListItem extends React.Component {

  state = {
    collapse: true
  };

  handleDeleteNote = () => {
    const { deleteNote, id } = this.props;
    deleteNote(id);
    console.log(id, typeof id);
  };

  handleCollapseNote = () => {
    this.setState(( { collapse }) => {
      return {
        collapse: !collapse
      }
    });
  };

  render() {
    const { id, body } = this.props;
    const { collapse } = this.state;
    const classItemCollapse = collapse ? 'notes-list-item-collapse' : '';

    return (
      <div key={id} className="notes-list-item list-group-item d-flex justify-content-between flex-nowrap">
        <div
          className={`notes-list-item-label ${classItemCollapse}`}
          onClick={this.handleCollapseNote}
        >
          {body}
        </div>
        <div className="d-flex flex-nowrap">
            <Link to={`/notes/${id}`}>
              <button
                type="button"
                className="btn btn-outline-success btn-sm float-right"
                // onClick={onEdit}
              >
                <i className="fa fa-pencil"/>
              </button>
            </Link>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm float-right"
            onClick={this.handleDeleteNote}
          >
            <i className="fa fa-trash"/>
          </button>
        </div>
      </div>
    );
  };
}

const mapDispatchToProps = {
  deleteNote: handleDeleteNote
};

export default connect(null, mapDispatchToProps)(NotesListItem);
