import { RightOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../hooks/useStore'
import './index.css'

function Setting() {
    const userStore = useUserStore()

    const onChangeAutoLogin = (checked) => {
        userStore.setting({ type: 'login', autoLogin: '' + Number(checked) })
        window.localStorage.setItem('autoLogin', Number(checked));
        // console.log(`switch to ${Number(checked)}`);
    }

    return (
        <div className="setting">
            <div className="setting-info">
                <div className={userStore.user ? "setting-avator active" : "setting-avator"}>
                    {
                        userStore.user && userStore.user.name ?
                        userStore.user.name.slice(-2):
                        <Link to='/login'>登录</Link>
                    }
                </div>
            </div>
            <div className="setting-list">
                {   userStore.user && 
                    <div className="list-item">
                        <span className="item-title">修改密码</span>
                        <Link to='/setting/password'><RightOutlined /></Link>
                    </div>
                }
                <div className="list-item">
                    <span className="item-title">默认城市</span>
                    <span>
                        { userStore.user ? userStore.user.default_city : '杭州' }
                        { userStore.user && <Link to='/setting/city'><RightOutlined /></Link>}
                    </span>
                </div>
                <div className="list-item">
                    <span className="item-title">历史天数</span>
                    <span>
                        { userStore.user ? userStore.user.default_day : 3 }
                        { userStore.user && <Link to='/setting/day'><RightOutlined /></Link>}
                    </span>
                </div>
                {   userStore.user && 
                    <div className="list-item">
                        <span className="item-title">自动登录</span>
                        <Switch defaultChecked={Boolean(userStore.user.auto_login)} onChange={onChangeAutoLogin} />
                    </div>
                }
            </div>
            {userStore.user && <div className="setting-logout" onClick={() => userStore.logout()}>退出登录</div>}
        </div>
    )
}

export default observer(Setting);