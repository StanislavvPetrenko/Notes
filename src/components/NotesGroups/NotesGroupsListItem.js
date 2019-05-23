import React from 'react';
import {Icon, Menu, Row} from 'antd/lib/index';
import { handleDeleteGroup } from '../../store/notesgroups';
import {connect} from "react-redux";

class NotesGroupsListItem extends React.Component {

  handleDeleteGroup = () => {
    const { deleteGroup, group: { id } } = this.props;
    deleteGroup(id);
    console.log(id, typeof id);
  };

  render () {
    const { group: { name } } = this.props;
    return (
        <Row type="flex" align="middle">
          <Icon type="folder" theme="twoTone"/>
          <span>{name}</span>
          <button
            onClick={this.handleDeleteGroup}
          >
            <Icon type="delete" theme="twoTone"/>
          </button>
        </Row>
    )
  }
}

const mapDispatchToProps = {
  deleteGroup: handleDeleteGroup
};

export default connect(null, mapDispatchToProps)(NotesGroupsListItem);


