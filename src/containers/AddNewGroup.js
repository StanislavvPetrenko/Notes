import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'antd';

import {addNewGroup} from '../store/notesgroups';
import './AddNewGroup.css'

class AddNewGroup extends React.Component {

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
    addNewGroup(name);
    this.setState(( { isCreateNewGroup, isAddNewGroup }) => {
      return {
        isCreateNewGroup: !isCreateNewGroup,
        isAddNewGroup: !isAddNewGroup,
        name: ''
      }
    });
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
        <div className={`${classCreateNewGroupButton}`}>
          <span className="notes-list-add-text">Add new group</span>
          <button
            type="button"
            className="btn btn-outline-info btn-sm float-right"
            onClick={this.handleCreateNewGroup}
          >
            <i className="fa fa-folder"/>
          </button>
        </div>
        <div className={`${classAddNewGroupButton}`}>
          <Input
            className="flex-grow-0 notes-group-input"
            size="large"
            placeholder="Enter group name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button
            type="button"
            className="btn btn-outline-info btn-sm float-right flex-shrink-1"
            onClick={this.handleAddNewGroup}
          >
          <i className="fa fa-check add-group-check"/>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm float-right"
            onClick={this.handleAbortAddNewGroup}
          >
            <i className="fa fa-times add-group-times"/>
          </button>
         </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  addNewGroup: addNewGroup
};

export default connect(null, mapDispatchToProps)(AddNewGroup)