import {
    Button,
    Card,
    Col,
    Form,
    Input,
    message,
    Row,
} from 'antd';
import useToken from '../../CustomHooks/useToken';
import { useNavigate } from "react-router-dom";
import { getValidLoginApi } from '../../Services/LoginService';

const Login = () => {
    const { setToken } = useToken();
    const navigate = useNavigate()

    const onFinish = (values) => {
        getValidLoginApi(values, (res) => {
            if (res.length !== 0 && res[0].UId > 0) {
                const newRes = res[0]
                const tokenData = {
                    Um: newRes.UId,
                    Hm: newRes.RoleId,
                    UserName: newRes.UserName,
                }
                setToken(tokenData)
                navigate('/admin')
            } else {
                message.error('Username or password is incorrect!')
            }
            return
        })
    }

    return (
        <Row type='flex' align='center'>
            <Col>
                <div className="site-card-border-less-wrapper text-center login_content">
                    <h2>Login</h2>
                    <Card bordered={false} className='buttonRadius'>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Username"
                                    autoFocus={true}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    block
                                >
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Col>
        </Row>
    )
}

export default Login