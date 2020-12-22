import { useEffect } from 'react'
import { observer } from 'mobx-react'
import ErrorBoundary from '../../component/ErrorBoundary'
import { useUserStore } from '../../hooks/useStore'
import './index.css'

function Map() {
    const userStore = useUserStore()

    useEffect(()=>{
        var map = new AMap.Map('container', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom: 11 //初始化地图层级
        })

        AMap.plugin([
            'AMap.ToolBar',
        ], function () {
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            map.addControl(new AMap.ToolBar({
                // 简易缩放模式，默认为 false
                liteStyle: true
            }));
        });

        map.setCity(userStore.user ? userStore.user.default_city : '杭州');
        
        return ()=>{
            map.destroy();
        }
    }, [])

    return (
        <div className="map">
            <ErrorBoundary>
                <div id="container"></div> 
            </ErrorBoundary>
        </div>
    )
}

export default observer(Map);