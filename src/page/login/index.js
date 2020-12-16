import { observer } from 'mobx-react'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { Form, Input, Button, Tooltip } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useUserStore } from '../../hooks/useStore'
import './index.css'

function Login() {
    const userStore = useUserStore()
    const history = useHistory()

    const onFinish = (values) => {
        userStore.login(values)
    };

    const goToRegister = () => {
        history.push('/register')
    }

    return (
        <div className="login">
            {userStore.user && <Redirect to="/" />}
            <div className="login-box">
                <Link to="/">
                    <Tooltip placement="right" title="点击返回首页">
                        <h1 className="login-title">图书管理系统</h1>
                    </Tooltip>
                </Link>
                <Form className="login-form" name="login" onFinish={onFinish}>
                    <Form.Item
                        name="account"
                        rules={[{ required: true, min: 1, max: 20, message: '请输入账号!' }]}
                    >
                        <Input placeholder="学/工号" prefix={<UserOutlined />} allowClear />
                    </Form.Item>
                    <Form.Item
                        name="passwd"
                        rules={[{ required: true, min: 6, max: 32, message: '请输入密码, 长度6-32位!' }]}
                    >
                        <Input.Password placeholder="密码" prefix={<LockOutlined />} allowClear />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" shape="round" className="login-btn" htmlType="submit">登 录</Button>
                        <Button shape="round" className="register-btn" onClick={goToRegister}>注 册</Button>
                    </Form.Item>
                </Form>
                <p className="login-tip">
                    <span>账户：2018212212675</span>
                    <span>密码：1qazXSW2</span>
                </p>
            </div>
        </div>
    )

}

export default observer(Login);