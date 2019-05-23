import React from 'react';
import { Layout, Typography, Row, Col } from 'antd/lib/index';
import './HomePageDescription.css'

const HomePageDescription = () => {
  const { Paragraph } = Typography;

  return (
    <Layout className="description-container">
      <Row>
        <Col span={4}>
          <img
            src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
            alt="content"
          />
        </Col>
        <Col span={20}>
          <h2 className="description-title">Feel organized without the effort</h2>
          <Paragraph>
            Black'note – single place for your notes, ideas, lists and reminders, which helps you capture and prioritize
            its so nothing falls through the cracks.
          </Paragraph>
          <span>
              Manage everything from big projects, deadlines, clients and meetings to personal moments with ease.
              Capture ideas and inspiration in notes, voice, and pictures.
              Never lose track of your tasks and deadlines.
            </span>
        </Col>
      </Row>
    </Layout>
  )
};

export default HomePageDescription;