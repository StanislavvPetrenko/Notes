import React from 'react';
import { Layout } from 'antd';

import HomePageDescription from './HomePageDescription';
import NotesPage from './NotesPage';

const HomePage = () => {

  const { Content } = Layout;

  return (
    <React.Fragment>
      <Content>
        <HomePageDescription />
        <NotesPage />
      </Content>
    </React.Fragment>
  );
};

export default HomePage;
