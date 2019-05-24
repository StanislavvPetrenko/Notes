import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Button, Spin, Icon } from 'antd/lib/index';
import { getNote, saveNote, clearNoteInfo } from '../store/onenote';
import { selectOneNoteData, selectOneNoteLoading } from '../store/onenote';
import { selectAuthUser } from '../store/authentication';
import { handleAddNewGroup } from '../store/notesgroups';
import NotesGroupsSelector from '../components/NotesGroupsSelector/NotesGroupsSelector';

import './EditNotePage.css'


class EditNotePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.noteData.body,
      group: '',
      userId: ''
    };
  }

  componentDidMount() {
    const {getNote} = this.props;
    const {id} = this.props.match.params;

    getNote(id)
      .then((note) => {
        if (note) {
          this.setState({
              text: note.body,
              group: note.group,
              userId: note.userId
            }
          )
        }
      });
  }

  handleChange = ({target: {value}}) => {
    this.setState({
        text: value
      }
    )
  };

  handleGroupChange = (group) => {
    console.log(group);
    this.setState({
      group: group
    });
  };

  handleSaveNote = () => {
    const { saveNote, addNewGroup } = this.props;
    const { id } = this.props.match.params;
    const { text: body, group: { value = "all", label, __isNew__ }  = {} } = this.state;
    if (__isNew__) {
      addNewGroup(label)
        .then((group) => {
          console.log(group);
          saveNote({ id, body, group: group.id});
        });
    }
    saveNote({ id, body, group: value });
  };

  render() {
    const { TextArea } = Input;
    const { noteLoading, user } = this.props;
    const isValidUser = this.state.userId && user.uid === this.state.userId;

    if (noteLoading) {
      return <div />
    }

    return (
      <React.Fragment>
        { !isValidUser ? <h1>Access denied!!</h1>
          :
          <div className="note-container">
            <div className="note-header d-flex align-items-center" >
              <Link to="/">
                <Button type="primary">
                  <Icon type="left" />
                  Go back
                </Button>
              </Link>
              <div className="d-flex align-items-center">
                <h3 className="note-header-title">Edit note</h3>
                <Icon className="note-header-icon color-default" type="edit" />
              </div>
            </div>
            <div className="note-container-main">
              <TextArea
                className="note-text-area"
                autosize={{minRows: 8, maxRows: 16}}
                type="text"
                value={this.state.text}
                onChange={this.handleChange}
              />
              <NotesGroupsSelector handleGroupChange={this.handleGroupChange} editNoteGroup={this.state.group}/>
              <Button
                type="primary"
                onClick={this.handleSaveNote}
                block>
                Save note
              </Button>
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
    noteData: selectOneNoteData(state),
    noteLoading: selectOneNoteLoading(state),
    user: selectAuthUser(state)
  });

const
  mapDispatchToProps = {
    getNote: getNote,
    saveNote: saveNote,
    clearNoteInfo: clearNoteInfo,
    addNewGroup: handleAddNewGroup
  };

export default connect(mapStateToProps, mapDispatchToProps)(EditNotePage);

// class EditNotePage extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: this.props.noteData.body
//     };
//   }
//
//   componentDidMount() {
//     const {getNote} = this.props;
//     const {id} = this.props.match.params;
//     getNote(id);
//   }
//
//   componentDidUpdate(prevProps) {
//    if ((!prevProps.noteData.body && this.props.noteData.body) || prevProps.noteData.body !== this.props.noteData.body) {
//       this.setState({
//         text: this.props.noteData.body
//       });
//       console.log(this.props.noteData.body);
//       console.log('!!!!!!!', prevProps.noteData.body);
//     }
//   };
//
//   handleChange = ({target: {value}}) => {
//     this.setState({
//         text: value
//       }
//     )
//   };
//
//   handleSaveNote = () => {
//     const { saveNote } = this.props;
//     const { id } = this.props.match.params;
//     const { text: body } = this.state;
//     saveNote({id,body});
//   };
//
//   render() {
//     const { TextArea } = Input;
//     const { noteLoading } = this.props;
//
//     console.log(this.state.text);
//     console.log(this.props);
//
//     return (
//       <div className="wrap content">
//         <div className="d-flex notes-list-item align-items-center">
//           <span>Edit note</span>
//           <i className="fa fa-pencil"/>
//         </div>
//         {noteLoading && <Spin/>}
//         {!noteLoading && (
//           <div className="wrap content">
//             <TextArea
//               // placeholder="Text note"
//               autosize={{minRows: 2, maxRows: 6}}
//               type="text"
//               value={this.state.text}
//               onChange={this.handleChange}
//             />
//             <div style={{margin: '24px 0'}}/>
//             <Button
//               type="primary"
//               onClick={this.handleSaveNote}
//               block>
//               Save note
//             </Button>
//           </div>)
//         }
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = state => ({
//   noteData: selectOneNoteData(state),
//   noteLoading: selectOneNoteLoading(state)
// });
//
// const mapDispatchToProps = {
//   getNote: getNote,
//   saveNote: saveNote,
//   clearNoteInfo: clearNoteInfo
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(EditNotePage);