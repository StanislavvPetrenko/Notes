import React from 'react';
import { Layout, Row, Col } from 'antd';
import NotesGroupsList from '../components/NotesGroups/NotesGroups';
import NotesList from '../components/NotesList/NotesList';

import './NotesPage.css';

class NotesPage extends React.Component {

  render() {
    return (
      <Layout className="notes-page-container flex-row">
        <NotesGroupsList />
        <NotesList />
      </Layout>
    );
  }
}

export default NotesPage;

// render() {
//    return (
//       <Layout className="notes-page-container flex-row">
//         <Row>
//           <Col span={4}>
//             <NotesGroupsList/>
//           </Col>
//           <Col span={20}>
//             <NotesList/>
//           </Col>
//         </Row>
//       </Layout>
//    );
//   }
// }