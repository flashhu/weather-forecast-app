import { useEffect, useState, useRef } from 'react'
import { Input, message } from 'antd'
import { observer } from 'mobx-react'
import { StockOutlined, FireOutlined } from '@ant-design/icons'
import { get } from '../../util/request'
import { API_CITY_CODE, API_NOW, API_FORCAST, API_CITY_IMAGE } from '../../constant/urls'
import { KEY, CLIENT_ID } from '../../constant/config'
import { useUserStore } from '../../hooks/useStore'
import './index.css'

const { Search } = Input;

const hotCity = [
    { name: '北京', code: '101010100'}, 
    { name: '上海', code: '101020100'}, 
    { name: '深圳', code: '101280601'}
]
const initImage = 'https://images.unsplash.com/photo-1573392116149-9655b831a5ed?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
let prevCity = '';

function HotCity() {
    const [cityData, setCityData] = useState([])

    useEffect(()=>{
        (async () => {
            for(let i = 0; i < hotCity.length; i ++) {
                const data = await get(API_NOW, { location: hotCity[i].code, key: KEY })
                if(data) {
                    hotCity[i]['now'] = data.now
                }
            }
            setCityData(hotCity)
        })()
    }, [])

    return (
        <>
            {cityData.map((item, index) =>
                item &&
                <div className="list-item" key={`hot${index}`}>
                    <div>{item.name}</div><div>{item.now.text} / {item.now.temp}℃</div>
                </div>
            )}
        </>
    )
}

function Today() {
    const userStore = useUserStore()
    const willAutoLogin = !!window.localStorage.token && window.localStorage.autoLogin !== '0' && !userStore.user
    // 不会执行登录操作，且尚未登录成功时，初始为杭州
    const initCity = willAutoLogin ? '?' : userStore.currDefaultCity ? userStore.currDefaultCity : '杭州'
    const cityInput = useRef(null)
    const [city, setCity] = useState(initCity)
    const [cityCode, setCityCode] = useState('?')
    const [nowData, setNowData] = useState(null)
    const [forcastData, setForcastData] = useState([])
    const [cityView, setCityView] = useState('')

    const onSearch = (value) => {
        prevCity = city;
        console.log(prevCity);
        setCity(value);
    }

    useEffect(()=>{
        if (userStore.currDefaultCity) {
            setCity(userStore.currDefaultCity)
        }
    }, [userStore.currDefaultCity])

    useEffect(()=>{
        (async () => {
            const cityData = await get(API_CITY_CODE, { location: city, key: KEY })
            if (cityData && cityData.code === '200') {
                const code = cityData.location ? cityData.location[0].id : ""
                code !== cityCode && setCityCode(code)
            }
            if (cityData && cityData.code === '404' && city !== '?') {
                message.error('当前查询城市不存在');
                setCity(prevCity)
                cityInput.current.state.value = ''
            }
        })()
    }, [city])

    useEffect(()=>{
        // 当前天气
        (async () => {
            const weatherData = await get(API_NOW, { location: cityCode, key: KEY })
            weatherData && weatherData.now && setNowData(weatherData.now)
        })();
        // 未来三天天气（带今天）
        (async () => {
            const weatherData = await get(API_FORCAST, { location: cityCode, key: KEY })
            weatherData && weatherData.daily && setForcastData(weatherData.daily)
        })();
        // 当前城市图片
        (async () => {
            const params = {query: `建筑${city}`, client_id: CLIENT_ID}
            const cityImage = await get(API_CITY_IMAGE, params)
            cityImage && setCityView(cityImage.results[0])
        })();
        cityInput.current.state.value = ''
    }, [cityCode])

    return (
        <div className="weather-today">
            <div className="city-view">
                <img className="city-image" alt="city-view" src={cityView ? cityView.urls.small : initImage} />
                <div className="image-source">
                    Photo by {cityView ? cityView.user.name: '...'} on Unsplash
                </div>
            </div>
            <div className="top-bar">
                <Search ref={cityInput} onSearch={onSearch} enterButton />
            </div>
            <div className="today">
                <div className="t-currCity">当前城市：{city}</div>
                <div className="t-weather">
                    <p className="t-temp">{nowData ? nowData.temp: '?'}</p>
                </div>
                <div className="t-detail">
                    <div className="list-wrapper">
                        <div className="list-item">
                            <div className="item-name">天气</div>
                            <div className="item-value">{nowData ? nowData.text : '?'}</div>
                        </div>
                    </div>
                    <div className="list-wrapper">
                        <div className="list-item">
                            <div className="item-name">湿度</div>
                            <div className="item-value">{`${nowData ? nowData.humidity : '?'}%`}</div>
                        </div>
                    </div>
                    <div className="list-wrapper">
                        <div className="list-item">
                            <div className="item-name">风速</div>
                            <div className="item-value">{`${nowData ? nowData.windDir + nowData.windScale : '?'}级`}</div>
                        </div>
                    </div>
                    <div className="list-wrapper">
                        <div className="list-item">
                            <div className="item-name">降水量</div>
                            <div className="item-value">{`${nowData ? nowData.precip : '?'}㎜`}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="list-wrapper">
                <div className="forcast-title"><StockOutlined />近期</div>
                {forcastData.map((item, index) => 
                    <div className="list-item" key={`forcast${index}`}>
                        <div>{index === 0 ? '今天': index === 1 ? '明天': '后天'}</div>
                        <div>{item.textDay}</div>
                        <div>{`${item.tempMax}° / ${item.tempMin}°`}</div>
                        <div>{`${item.windDirDay}${item.windScaleDay}级`}</div>
                    </div>
                )}
            </div>
            <div className="list-wrapper">
                <div className="forcast-title"><FireOutlined />热门</div>
                <HotCity />
            </div>
        </div>
    )
}

export default observer(Today);