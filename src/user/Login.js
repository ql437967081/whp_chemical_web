import React from 'react';
import { Button, Card, Col, Form, Input, Layout, message, Row } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { axios, handleFailure } from '../http_request/default';
import { loginUrl } from '../http_request/url';

const { Content } = Layout;

const setItems = data => {
    for (let item in data) {
        console.log(item, data[item]);
        sessionStorage.setItem(item, data[item]);
    }
};

function Login({ history }) {
    const onFinish = values => {
        console.log('Received values of form: ', values);
        axios.post(loginUrl, values)
            .then(function (response) {
                const { data } = response.data;
                const { managerId } = data;
                if (!managerId) {
                    message.error('密码错误！');
                    return;
                }
                setItems(data);
                history.push('/admin');
            })
            .catch(handleFailure);
    };

    return (
        <Layout>
            <Content style={{ minHeight: '100vh' }}>
                <Row justify="space-around" style={{ paddingTop: '20vh' }}>
                    <Col>
                        <Card title={'WHP 管理员登录'} bordered={false}
                              headStyle={{ textAlign: "center" }}
                              style={{ maxWidth: 300 }}>
                            <Form onFinish={onFinish}>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码!',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="密码"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block>
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default withRouter(Login);
