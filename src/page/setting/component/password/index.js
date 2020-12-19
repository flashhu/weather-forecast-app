import { observer } from 'mobx-react'
import { Form, Input, Button, message } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { useUserStore } from '../../../../hooks/useStore'

function ModifyPwd() {
    const userStore = useUserStore()
    const history = useHistory()

    const onFinish = async (values) => {
        if (values.newPasswd1 === values.newPasswd2) {
            values['newPasswd'] = values.newPasswd1
            const r = await userStore.setting({ type: 'pwd', ...values })
            r && history.push('/setting')
        } else {
            message.warn('两次密码输入不一致')
        }
    };

    return (
        <div className="setting-day editPage-wrapper">
            <div className="topbar">
                <Link to="/setting">
                    <LeftOutlined />
                </Link>
                修改密码
            </div>
            <div className="edit-box">
                <Form className="edit-form" onFinish={onFinish}>
                    <Form.Item
                        name="oldPasswd"
                        label="原密码"
                        rules={[{ required: true, message: '请输入原密码!' }]}
                    >
                        <Input.Password placeholder="请输入原密码" allowClear />
                    </Form.Item>
                    <Form.Item
                        name="newPasswd1"
                        label="新密码"
                        rules={[{
                            required: true, message: '密码不可为空!'
                        }, {
                            min: 6, max: 32, message: '密码长度不合法, 要求6~32位!'
                        }, {
                            type: 'string', pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,32}$/, message: '密码必需包含大小写字母和数字!'
                        }]}
                    >
                        <Input.Password placeholder="请输入新密码" allowClear />
                    </Form.Item>
                    <Form.Item
                        name="newPasswd2"
                        label="确认密码"
                        rules={[{ required: true, message: '请输入确认密码!' }]}
                    >
                        <Input.Password placeholder="请确认密码" allowClear />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" shape="round" className="edit-btn" htmlType="submit">保 存</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default observer(ModifyPwd)