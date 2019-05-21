import React from 'react';
import { Input, Button } from 'antd';
import { addNewNote } from '../store/noteslist';
import { connect } from "react-redux";

import './NewNote.css';

class NewNote extends React.Component {

  state = {
    body:''
  };

  handleInputChange = inputValue => ({ target: { value } }) => {
    this.setState({
      [inputValue]: value
    });
  };

  handleAddNewNote = () => {
    const { addNewNote } = this.props;
    const { body } = this.state;
    addNewNote(body);
    this.setState({
      body: ''
    });
  };


  render() {
    const { TextArea } = Input;

    const { body } = this.state;
    return (
        <div className="wrap content" >
          <h2>Create new note</h2>
          {/*<TextArea*/}
          {/*  placeholder="Title note"*/}
          {/*  type="text"*/}
          {/*  onChange={this.handleInputChange("title")}*/}
          {/*  value={title}*/}
          {/*  autosize/>*/}
          {/*<div style={{margin: '24px 0'}}/>*/}
          <TextArea
            placeholder="Text note"
            autosize={{minRows: 2, maxRows: 6}}
            type="text"
            value={body}
            onChange={this.handleInputChange("body")}
          />
          <div style={{margin: '24px 0'}}/>
          <Button
            type="primary"
            onClick={this.handleAddNewNote}
            block>
            Add new notes
          </Button>
        </div>
    );
  }
}

const mapDispatchToProps = {
  addNewNote: addNewNote
};

export default connect(null, mapDispatchToProps)(NewNote)
