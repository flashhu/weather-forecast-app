import { observer } from 'mobx-react'
import { Form, InputNumber, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { useUserStore } from '../../../../hooks/useStore'

function DefaultDay() {
    const userStore = useUserStore()
    const history = useHistory()

    const onFinish = async (values) => {
        const r = await userStore.setting({ type: 'day', ...values })
        r && history.push('/setting')
    };

    return (
        <div className="setting-day editPage-wrapper">
            <div className="topbar">
                <Link to="/setting">
                    <LeftOutlined />
                </Link>
                历史天数
            </div>
            <div className="edit-box">
                <Form className="edit-form" onFinish={onFinish}>
                    <Form.Item
                        name="day"
                        label="天数"
                        rules={[
                            { required: true, message: '请输入天数!' }
                        ]}
                    >
                        <InputNumber 
                            placeholder="请输入默认查询天数"
                            min={1}
                            max={7}
                            style={{ width: '100%' }}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" shape="round" className="edit-btn" htmlType="submit">保 存</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default observer(DefaultDay)