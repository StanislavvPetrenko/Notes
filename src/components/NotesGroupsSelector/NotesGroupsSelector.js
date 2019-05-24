import React from 'react';
import { connect } from 'react-redux';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import {getGroupsCollection, selectNotesGroupsData } from '../../store/notesgroups';

import './NotesGroupsSelector.css'

class NotesGroupsSelector extends React.Component {

  state = {
    groups: [],
    currentGroup: undefined,
    inputValue: ''
  };

  componentDidMount() {
    const { getGroupsCollection, editNoteGroup } = this.props;
    getGroupsCollection()
      .then((groups) => {
        console.log(this.props);
        if (groups) {
          const newGroups = groups.map(el => {
            return {value: el.id, label: el.name}
          });
          this.setState({
            groups: newGroups,
            currentGroup: newGroups.find(el => el.value === editNoteGroup)
          })
        }
      });
  }

  filterGroups = (inputValue) => {
    const { groups } = this.state;
    return groups.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterGroups(inputValue));
      }, 1000);
    });

  handleChange = (newValue) => {
    console.log(newValue);
    const { handleGroupChange } = this.props;
    this.setState({
      currentGroup: newValue
    });
    newValue && handleGroupChange(newValue);
  };

  render() {
    const { editNoteGroup } = this.props;
    const { currentGroup } = this.state;
    console.log("editNoteGroup");
    console.log(editNoteGroup);
    console.log("currentGroup");
    console.log(currentGroup);

    return (
      <div className="notes-groups-selector">
        <AsyncCreatableSelect
          placeholder="Type or select group"
          cacheOptions
          isClearable //возможность очищать select
          value={this.state.currentGroup}
          defaultOptions
          noOptionsMessage={() => "No groups"} //сообщение, которое выводится, если нет доступных для выбора групп
          loadOptions={this.promiseOptions}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notesGroupsData: selectNotesGroupsData(state),
});

const mapDispatchToProps = {
  getGroupsCollection: getGroupsCollection
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesGroupsSelector);
