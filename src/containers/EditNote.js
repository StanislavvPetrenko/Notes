import React from 'react';
import {connect} from 'react-redux';
import {Input, Button, Spin} from 'antd';
import {getNote, saveNote, clearNoteInfo} from '../store/onenote';
import {selectOneNoteData, selectOneNoteLoading} from '../store/onenote/';
import {selectAuthUser} from "../store/authentication";

class EditNote extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.noteData.body,
      userId: ''
    };
  }

  componentDidMount() {
    const {getNote} = this.props;
    const {id} = this.props.match.params;

    getNote(id)
      .then((note) => {
        if (note) {
          console.log(note);
          this.setState({
              text: note.body,
              userId: note.userId
            }
          )
        }
        console.log(note)
      });
  }

  handleChange = ({target: {value}}) => {
    this.setState({
        text: value
      }
    )
  };

  handleSaveNote = () => {
    const { saveNote } = this.props;
    const { id } = this.props.match.params;
    const { text: body } = this.state;
    saveNote({id,body});
  };

  render() {
    const { TextArea } = Input;
    const { noteLoading, user } = this.props;
    const isValidUser = this.state.userId && user.uid === this.state.userId;

    if (!isValidUser) {
      return <h1>Access denied!!</h1>
    }

    return (
      <div className="wrap content">
        <div className="d-flex notes-list-item">
          <span>Edit note</span>
          <i className="fa fa-pencil"/>
        </div>
        {noteLoading && <Spin/>}
        {!noteLoading && (
          <div className="wrap content">
            <TextArea
              placeholder="Text note"
              autosize={{minRows: 2, maxRows: 6}}
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
            <div style={{margin: '24px 0'}}/>
            <Button
              type="primary"
              onClick={this.handleSaveNote}
              block>
              Save note
            </Button>
          </div>)
        }
      </div>
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
    clearNoteInfo: clearNoteInfo
  };

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);

// class EditNote extends React.Component {
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
// export default connect(mapStateToProps, mapDispatchToProps)(EditNote);