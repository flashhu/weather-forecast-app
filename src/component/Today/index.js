import { useEffect, useState, useRef } from 'react'
import { Input } from 'antd';
import { StockOutlined } from '@ant-design/icons'
import { get } from '../../util/request'
import { API_CITY_CODE, API_NOW, API_FORCAST, API_CITY_IMAGE } from '../../constant/urls'
import { KEY, CLIENT_ID } from '../../constant/config'
import './index.css'

const { Search } = Input;

const defaultValue = {
    city: '杭州',
    image: {
        urls: {
            small: 'https://images.unsplash.com/photo-1556811459-4dd84308172e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTEyMTF8MHwxfHNlYXJjaHwxfHwlRTUlQkIlQkElRTclQUQlOTElRTYlOUQlQUQlRTUlQjclOUV8ZW58MHx8fA&ixlib=rb-1.2.1&q=80&w=400'
        },
        user: {
            name: "远扩 王"
        }
    }
}

function Today() {
    const cityInput = useRef(null)
    const [city, setCity] = useState(defaultValue.city)
    const [nowData, setNowData] = useState(null)
    const [forcastData, setForcastData] = useState([])
    const [cityView, setCityView] = useState(defaultValue.image)

    const onSearch = (value) => {
        setCity(value);
    }

    useEffect(()=>{
        const getCityCode = async () => {
            const cityData = await get(API_CITY_CODE, { location: city, key: KEY})
            return cityData && cityData.location ? cityData.location[0].id : "101210101"
        }
        const getNowWeather = async () => {
            const cityCode = await getCityCode();
            const weatherData = await get(API_NOW, { location: cityCode, key: KEY })
            weatherData && setNowData(weatherData.now)
        }
        const getForcastData = async () => {
            const cityCode = await getCityCode();
            const weatherData = await get(API_FORCAST, { location: cityCode, key: KEY })
            weatherData && setForcastData(weatherData.daily)
        }
        const getCityImage = async () => {
            const params = {query: `建筑${city}`, client_id: CLIENT_ID}
            const cityImage = await get(API_CITY_IMAGE, params)
            cityImage && setCityView(cityImage.results[0])
        }
        getNowWeather();
        getForcastData();
        getCityImage();
    }, [city])

    return (
        <div className="weather-today">
            <div className="city-view">
                <img className="city-image" alt="city-view" src={cityView ? cityView.urls.small : ''} />
                <div className="image-source">
                    Photo by {cityView.user.name} on Unsplash
                </div>
            </div>
            <div className="top-bar">
                <Search defaultValue={defaultValue.city} ref={cityInput} onSearch={onSearch} enterButton />
            </div>
            <div className="today">
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
        </div>
    )
}

export default Today;