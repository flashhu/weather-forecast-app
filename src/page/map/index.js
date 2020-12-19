import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useUserStore } from '../../hooks/useStore'
import './index.css'

function Map() {
    const userStore = useUserStore()

    useEffect(()=>{
        var map = new AMap.Map('container', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom: 11 //初始化地图层级
        })

        map.setCity(userStore.user ? userStore.user.default_city : '杭州');
        
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