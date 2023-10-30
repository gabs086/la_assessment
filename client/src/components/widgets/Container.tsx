import React from 'react';

import { Layout, Row, Col } from 'antd';

type Props = {
  children: string | JSX.Element | JSX.Element[] | React.ReactNode;
};
const Container = ({ children }: Props) => {
  return (
    <Layout>
      <Layout.Content style={{ padding: '24px 24px 24px' }}>
        <Layout style={{ padding: '24px 0', background: '#ffffff' }}>
          <Layout.Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            <Row>
              <Col span={12} offset={6}>
                {children}
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  );
};

export default Container;
