import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd/lib/index';
import { handleDeleteNote, handleSetNotes } from '../../store/noteslist';

import './NotesListItem.css'

class NotesListItem extends React.Component {

  state = {
    collapse: true
  };

  handleDeleteNote = () => {
    const { deleteNote, id } = this.props;
    deleteNote(id);
  };

  handleRestoreNote = () => {
    const { setNotes, body, group, id } = this.props;
    setNotes({body, group, deleted: false, id});
  };

  handleMoveNoteToTrash = () => {
    const { setNotes, body, group, id } = this.props;
    setNotes({body, group, deleted: true, id});
  };

  handleCollapseNote = () => {
    this.setState(( { collapse }) => {
      return {
        collapse: !collapse
      }
    });
  };

  render() {
    const { id, body, deleted } = this.props;
    const { collapse } = this.state;
    const classItemCollapse = collapse ? 'notes-list-item-collapse' : '';

    return (
      <div key={id} className="notes-list-item d-flex justify-content-between flex-nowrap">
        <div
          className={`notes-list-item-label ${classItemCollapse}`}
          onClick={this.handleCollapseNote}
        >
          {body}
        </div>
        { !deleted ?
            <div className="wrap-btn-list-item d-flex align-items-center flex-nowrap">
              <Link to={`/notes/${id}`}>
                <button
                  className="btn-default btn-list-item btn-list-item-edit d-flex align-items-center"
                >
                  <Icon type="form"/>
                </button>
              </Link>
              <button
              className = "btn-default btn-list-item btn-list-item-delete d-flex align-items-center"
              onClick={this.handleMoveNoteToTrash}
              >
              <Icon type="delete"/>
              </button>
            </div>
            :
            <div className="wrap-btn-list-item d-flex align-items-center flex-nowrap">
              <button
                className="btn-default btn-list-item btn-list-item-edit d-flex align-items-center"
                onClick={this.handleRestoreNote}
              >
                <Icon type="rollback" />
              </button>
              <button
                className = "btn-default btn-list-item btn-list-item-delete d-flex align-items-center"
                onClick={this.handleDeleteNote}
              >
                <Icon type="stop" />
              </button>
            </div>
        }
      </div>
    );
  };
}

const mapDispatchToProps = {
  deleteNote: handleDeleteNote,
  setNotes: handleSetNotes
};

export default connect(null, mapDispatchToProps)(NotesListItem);
