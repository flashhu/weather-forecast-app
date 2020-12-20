import { observer } from 'mobx-react'
import { Form, Input, Button, message } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { useUserStore } from '../../../../hooks/useStore'
import { get } from '../../../../util/request'
import { API_CITY_CODE } from '../../../../constant/urls'
import { KEY } from '../../../../constant/config'

function DefaultCity() {
    const userStore = useUserStore()
    const history = useHistory()

    const onFinish = async (values) => {
        const cityData = await get(API_CITY_CODE, { location: values.cityName, key: KEY })
        if(cityData && cityData.code === "200" && cityData.location.length) {
            const r = await userStore.setting({ type: 'city', cityName: cityData.location[0].name, cityCode: cityData.location[0].id })
            r && history.push('/setting')
        } else {
            message.error('该城市不存在，请重输！')
        }
    };
    
    return (
        <div className="setting-city editPage-wrapper">
            <div className="topbar">
                <Link to="/setting">
                    <LeftOutlined />
                </Link>
                默认城市
            </div>
            <div className="edit-box">
                <Form className="edit-form" onFinish={onFinish}>
                    <Form.Item
                        name="cityName"
                        label="城市"
                        rules={[
                            { required: true, message: '请输入天数!' }
                        ]}
                    >
                        <Input placeholder="请输入城市名称" allowClear />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" shape="round" className="edit-btn" htmlType="submit">保 存</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default observer(DefaultCity)