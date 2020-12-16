import { Tabs } from 'antd';
import Today from '../../component/Today'
import Pic from '../../component/Pic'
import './index.css'

const { TabPane } = Tabs;

function Weather() {
    return (
        <div className="weather">
        <Tabs defaultActiveKey="1">
            <TabPane tab="今日" key="1">
                <Today />
            </TabPane>
            <TabPane tab="推荐" key="2">
                <Pic />
            </TabPane>
        </Tabs>
        </div>
    )
}

export default Weather;