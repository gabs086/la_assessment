import React from 'react';

import { Layout, theme, Row, Col } from 'antd';

const { Content } = Layout;

type Props = {
  children: string | JSX.Element | JSX.Element[] | React.ReactNode;
};
const Container = ({ children }: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: '24px 24px 24px' }}>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            <Row>
              <Col span={12} offset={6}>
                {children}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Container;
