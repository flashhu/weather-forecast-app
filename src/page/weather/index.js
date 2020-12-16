import { Tabs } from 'antd';
import Today from '../../component/Today'
import Pic from '../../component/Pic'

const { TabPane } = Tabs;

function Weather() {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="今日" key="1">
                <Today />
            </TabPane>
            <TabPane tab="推荐" key="2">
                <Pic />
            </TabPane>
        </Tabs>
    )
}

export default Weather;