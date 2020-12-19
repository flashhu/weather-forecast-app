import { observer } from 'mobx-react'
import { Redirect, Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, LeftOutlined } from '@ant-design/icons'
import { useUserStore } from '../../hooks/useStore'
import './index.css'

function Login() {
    const userStore = useUserStore()

    const onFinish = async (values) => {
        await userStore.login(values)
    };

    return (
        <div className="login editPage-wrapper">
            {userStore.user && <Redirect to='/' />}
            <div className="topbar">
                <Link to="/setting">
                    <LeftOutlined />
                </Link> 
                登录
            </div>
            <div className="edit-box">
                <Form className="edit-form" name="login" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, min: 1, max: 20, message: '请输入账号名!' }]}
                    >
                        <Input placeholder="昵称" prefix={<UserOutlined />} allowClear />
                    </Form.Item>
                    <Form.Item
                        name="passwd"
                        rules={[{ required: true, min: 6, max: 32, message: '请输入密码, 长度6-32位!' }]}
                    >
                        <Input.Password placeholder="密码" prefix={<LockOutlined />} allowClear />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" shape="round" className="edit-btn" htmlType="submit">登 录</Button>
                    </Form.Item>
                </Form>
                <p className="login-tip">
                    <span>账户：张三</span>
                    <span>密码：1qazXSW2</span>
                </p>
            </div>
        </div>
    )

}

export default observer(Login);