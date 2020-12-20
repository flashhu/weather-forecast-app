import { Tabs } from 'antd';
import Today from '../../component/Today'
import Pic from '../../component/Pic'
import ErrorBoundary from '../../component/ErrorBoundary'
import './index.css'

const { TabPane } = Tabs;

function Weather() {
    return (
        <div className="weather">
        <Tabs defaultActiveKey="1">
            <TabPane tab="今日" key="1">
                <ErrorBoundary>
                    <Today />
                </ErrorBoundary>
            </TabPane>
            <TabPane tab="推荐" key="2">
                <ErrorBoundary>
                    <Pic />
                </ErrorBoundary>
            </TabPane>
        </Tabs>
        </div>
    )
}

export default Weather;