import { useEffect } from 'react'
import { Collapse } from 'antd'
import { observer } from 'mobx-react'
import { VictoryChart, VictoryGroup, VictoryTooltip, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryAxis } from 'victory';
import { get } from '../../util/request'
import { API_HISTORY } from '../../constant/urls'
import { useUserStore } from '../../hooks/useStore'
import { getHistoryDate } from '../../util/date'
import { KEY_HISTORY } from '../../constant/config'
import './index.css'

const { Panel } = Collapse;

const handleData = (hour) => {
    return hour.map((item, index) => {
        return {x: `${index}`, y: item.temp, text: item.text}
    })
}

function History() {
    const userStore = useUserStore()
    
    useEffect(() => {
        const willAutoLogin = !!window.localStorage.token && window.localStorage.autoLogin !== '0'
        if (userStore.currDefaultCity || (!willAutoLogin)) {
            // 登录后取到默认城市 或 不会自动登录（取默认值）
            const code = userStore.user ? userStore.user.default_city_code : '101210101'
            const dayNum = userStore.user ? userStore.user.default_day : 3
            const historyData = getHistoryDate(dayNum).map(item => {return { date: item, daily: null, hourly: [] }});

            (async () => {
                // 取到历史数据，设置历史数据的初始值，数据存在store
                for (let i = 0; i < dayNum; i++) {
                    const data = await get(API_HISTORY, { location: code, key: KEY_HISTORY, date: historyData[i].date })
                    if (data) {
                        historyData[i]['daily'] = data.weatherDaily
                        historyData[i]['hourly'] = data.weatherHourly
                    }
                }
                userStore.setHistoryData(historyData)
            })()
        }
    }, [userStore.currDefaultCity])

    return (
        <div className="history">
            <div className="history-title">
                历史
                <span>查询城市：{userStore.currDefaultCity || '杭州'}</span>
            </div>
            <Collapse defaultActiveKey={['0']} accordion>
                {userStore.historyData.map((item, index) =>
                    <Panel header={item.date} key={index}>
                        <div className="daily-info">
                            <div className="info-item">
                                <div>当天最高温度</div><div>{item.daily.tempMax}℃</div>
                            </div>
                            <div className="info-item">
                                <div>当天最低温度</div><div>{item.daily.tempMin}℃</div>
                            </div>
                            <div className="info-item">
                                <div>当天降水量</div><div>{item.daily.precip}㎜</div>
                            </div>
                        </div>
                        <VictoryChart>    
                            <VictoryGroup
                                color="#1890ff"
                                labels={({ datum }) => `${datum.y}℃, ${datum.text}`}
                                labelComponent={
                                    <VictoryTooltip
                                        flyoutWidth={50}
                                        style={{ fontSize: 10 }}
                                    />
                                }
                                data={handleData(item.hourly)}
                            >
                                <VictoryLine />
                                <VictoryScatter size={3} />
                            </VictoryGroup>
                        </VictoryChart>
                    </Panel>
                )}
            </Collapse>
        </div>
    )
}

export default observer(History);