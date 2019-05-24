import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Button, Icon } from 'antd/lib/index';
import { addNewNote } from '../store/noteslist';
import { handleAddNewGroup } from '../store/notesgroups';

import NotesGroupsSelector from '../components/NotesGroupsSelector/NotesGroupsSelector';

import './AddNewNote.css';

class AddNewNote extends React.Component {

  state = {
    body:'',
    group: ''
  };

  handleInputChange = inputValue => ({ target: { value } }) => {
    this.setState({
      [inputValue]: value
    });
  };

  handleGroupChange = (group) => {
    console.log(group);
    this.setState({
      group: group
    });
  };

  handleAddNewNote = () => {
    const { addNewNote, addNewGroup } = this.props;
    const { body, group: { value = "all", label, __isNew__ }  = {} } = this.state;
    if(body.trim() !== '') {
      if (__isNew__) {
        addNewGroup(label)
          .then((requestgroup) => {
            console.log(requestgroup);
            addNewNote(body, requestgroup.id);
          });
      }
      addNewNote(body, value);
      this.setState({
        body: ''
      });
    }
  };

  render() {
    const { TextArea } = Input;

    const { body } = this.state;
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
            <h3 className="note-header-title">Create new note</h3>
            <Icon className="note-header-icon color-default" type="form" />
          </div>
        </div >
        <div className="note-container-main">
          <TextArea
            className="note-text-area"
            placeholder="Text note"
            autosize={{minRows: 8, maxRows: 16}}
            type="text"
            value={body}
            onChange={this.handleInputChange("body")}
          />
          <NotesGroupsSelector handleGroupChange={this.handleGroupChange}/>
          <Button
            type="primary"
            onClick={this.handleAddNewNote}
            block>
            Add new notes
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addNewNote: addNewNote,
  addNewGroup: handleAddNewGroup
};

export default connect(null, mapDispatchToProps)(AddNewNote)
