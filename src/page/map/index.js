import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useCityStore } from '../../hooks/useStore'
import './index.css'

function Map() {
    const cityStore = useCityStore()

    useEffect(()=>{
        var map = new AMap.Map('container', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom: 11 //初始化地图层级
        })

        map.setCity(cityStore.currDefaultCity);
        
        return ()=>{
            map.destroy();
        }
    }, [])

    return (
        <div className="map">
            <div id="container"></div> 
        </div>
    )
}

export default observer(Map);