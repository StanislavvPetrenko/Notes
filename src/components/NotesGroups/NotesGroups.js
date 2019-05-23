import './NotesGroups.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Layout, Menu, Icon, Row } from 'antd/lib/index';
import { getGroupsCollection } from '../../store/notesgroups';
import { selectNotesGroupsData, selectNotesGroupsLoading } from '../../store/notesgroups';
import AddNewGroup from './NotesGroupsAddNewItem';
import NotesGroupsListItem from './NotesGroupsListItem';
import { setNotesListFilter } from '../../store/noteslist';

class NotesGroupsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: ''
    }
  };

  handleSetFilter = (e) => {
    const { setFilter } = this.props;
    console.log('onClick!', e);
    e.key === "deleted" ? setFilter({group: "", deleted: true}) : setFilter({group: e.key, deleted: false});
  };

  componentDidMount() {
    const { getGroupsCollection } = this.props;
    getGroupsCollection();
  };

  render() {
    const { Sider } = Layout;
    const { notesGroupsData, loading } = this.props;
    return (
      <Sider width={260} style={{ background: '#fff' }}>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["all"]}
              onClick={this.handleSetFilter}
        >
          <Menu.Item key="all">
            <Row type="flex" align="middle">
              <Icon type="file" theme="twoTone"/>
              <span>All Notes</span>
            </Row>
          </Menu.Item>
          { notesGroupsData.length && notesGroupsData.map(group => (
              <Menu.Item key={group.id}>
                <NotesGroupsListItem group={group}/>
              </Menu.Item>
            ))
          }
          <Menu.Item key="deleted">
            <Row type="flex" align="middle">
              <Icon type="rest" theme="twoTone"/>
              <span>Deleted</span>
            </Row>
          </Menu.Item>
        </Menu>
        <AddNewGroup />
      </Sider>
    );
  };
}

const mapStateToProps = state => ({
  notesGroupsData: selectNotesGroupsData(state),
  loading: selectNotesGroupsLoading(state)
});

const mapDispatchToProps = {
  getGroupsCollection: getGroupsCollection,
  setFilter: setNotesListFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesGroupsList);