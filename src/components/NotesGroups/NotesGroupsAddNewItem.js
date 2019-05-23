import React from 'react';
import {connect} from 'react-redux';
import {Input, Icon} from 'antd/lib/index';

import {addNewGroup} from '../../store/notesgroups';
import './NotesGroupsAddNewItem.css'

class NotesGroupsAddNewItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCreateNewGroup: false,
      isAddNewGroup: false,
      name: ''
    };
  }

  handleCreateNewGroup = () => {

    this.setState(( { isCreateNewGroup, isAddNewGroup }) => {
      return {
        isCreateNewGroup: !isCreateNewGroup,
        isAddNewGroup: !isAddNewGroup
      }
    });
  };

  handleAddNewGroup = () => {
    const { addNewGroup } = this.props;
    const { name } = this.state;
    if(name.trim() !== '') {
      addNewGroup(name);
      this.setState(({isCreateNewGroup, isAddNewGroup}) => {
        return {
          isCreateNewGroup: !isCreateNewGroup,
          isAddNewGroup: !isAddNewGroup,
          name: ''
        }
      });
    }
  };

  handleAbortAddNewGroup = () => {
    this.setState(( { isCreateNewGroup, isAddNewGroup }) => {
      return {
        isCreateNewGroup: !isCreateNewGroup,
        isAddNewGroup: !isAddNewGroup,
        name: ''
      }
    });
  };

  handleChange = ({target: {value}}) => {
    this.setState({
        name: value
      }
    )
  };
  
  render() {
    const { isCreateNewGroup, isAddNewGroup } = this.state;

    const classCreateNewGroupButton = isCreateNewGroup ? 'd-none' : 'd-flex';
    const classAddNewGroupButton = isAddNewGroup ? 'd-flex' : 'd-none';

    return (
      <React.Fragment>
        <div className="add-folder-fake"/>
        <div className={`add-folder ${classCreateNewGroupButton}`}>
          <button
            className="btn-default btn-add-folder-create d-flex align-items-center"
            onClick={this.handleCreateNewGroup}
          >
            <Icon type="folder-add"/>
            <span className="groups-list-add-text groups-list-add-text-create">Create new group</span>
          </button>
        </div>
        <div className={`add-folder ${classAddNewGroupButton}`}>
          <button
            className="btn-default btn-add-folder-abort d-flex align-items-center"
            onClick={this.handleAbortAddNewGroup}
          >
            <Icon type="close-square" />
          </button>
          <input
            className="groups-list-add-text groups-list-add-input"
            placeholder="Enter group name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button
            className="btn-default btn-add-folder-check d-flex align-items-center"
            onClick={this.handleAddNewGroup}
          >
            <Icon type="check-square"/>
          </button>
         </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  addNewGroup: addNewGroup
};

export default connect(null, mapDispatchToProps)(NotesGroupsAddNewItem)