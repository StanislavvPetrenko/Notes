import React from 'react';
import {connect} from "react-redux";
import {Icon, Row} from 'antd/lib/index';
import {handleDeleteGroup, handleRenameNotesGroup} from '../../store/notesgroups';
import './NotesGroupsListItem.css'

class NotesGroupsListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      renameGroup: false,
      name: ''
    };
  }

  componentDidMount() {
    this.setState(()  => {
      return {
        name: this.props.group.name,
      }
    });
  }

  handleDeleteGroup = () => {
    const { deleteGroup, group: { id } } = this.props;
    deleteGroup(id);
  };

  handleRenameGroup = () => {
    this.setState(( { renameGroup }) => {
      return {
        renameGroup: !renameGroup,
      }
    });
  };

  handleSubmitRename = () => {
    const { renameGroup, group: { id } } = this.props;
    const { name } = this.state;
    if(name.trim() !== '') {
      renameGroup({name, id});
      this.setState(({renameGroup}) => {
        return {
          renameGroup: !renameGroup,
        }
      });
    }
  };

  handleAbortRenameGroup= () => {
    this.setState(( { renameGroup }) => {
      return {
        renameGroup: !renameGroup,
        name: this.props.group.name
      }
    });
  };

  handleChange = ({target: {value}}) => {
    this.setState({
        name: value
      }
    )
  };

  render () {
    const { renameGroup } = this.state;

    const classNameGroup = renameGroup ? 'd-none' : '';
    const classEdinNameGroup = renameGroup ? '' : 'd-none';

    const { group: { name } } = this.props;
    return (
      <React.Fragment>
        <div className={`${classNameGroup}`}>
          <Row type="flex" justify="space-between" align="middle">
            <div>
              <Icon type="folder" theme="twoTone"/>
              <span>{name}</span>
            </div>
            <div>
              <button className="color-one btn-group btn-item-edit"
                      onClick={this.handleRenameGroup}
              >
                <Icon type="edit"/>
              </button>
              <button className="color-two btn-group btn-item-delete"
                      onClick={this.handleDeleteGroup}
              >
                <Icon type="delete"/>
              </button>
            </div>
          </Row>
        </div>
        <div className={`${classEdinNameGroup}`}>
          <Row type="flex" justify="space-between" align="middle">
            <div>
              <Icon type="folder" theme="twoTone"/>
              <input
                className="group-item-input"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button
                      type="submit"
                      className="color-one btn-group btn-item-edit"
                      onClick={this.handleSubmitRename}
              >
                <Icon type="check-square"/>
              </button>
              <button className="color-two btn-group btn-item-delete"
                      onClick={this.handleAbortRenameGroup}
              >
                <Icon type="close-square" />
              </button>
            </div>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  deleteGroup: handleDeleteGroup,
  renameGroup: handleRenameNotesGroup
};

export default connect(null, mapDispatchToProps)(NotesGroupsListItem);


