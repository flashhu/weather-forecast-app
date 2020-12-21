import { makeAutoObservable, runInAction } from 'mobx'
import { message } from 'antd'
import { get, post } from '../util/request'
import { API_USER_LOGIN, API_USER_TOKEN_LOGIN, API_USER_SETTING } from '../constant/urls'

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    user = null
    currDefaultCity = ''
    historyData = []

    async login(params) {
        const data = await post(API_USER_LOGIN, params);
        if (data) {
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('autoLogin', data.info.auto_login);
            runInAction(() => {
                this.user = data.info;
                this.currDefaultCity = data.info.default_city;
            })
            message.success('登录成功');
        }
    }

    async loginWithToken() {
        const data = await get(API_USER_TOKEN_LOGIN);
        if (data) {
            runInAction(() => {
                this.user = data.info
                this.currDefaultCity = data.info.default_city
            })
            message.success('登录成功');
        }
    }

    /**
     * 用户设置——修改部分值
     * 1. pwd
     * 传值：oldPasswd 原密码；newPasswd 新密码
     * 2. city
     * 传值：cityName 城市名称；cityCode 城市代码
     * 3. day
     * 传值：day
     * 4. login
     * 传值：autoLogin
     * @param {*} params 
     */
    async setting(params) {
        const data = await post(API_USER_SETTING, params)
        if (data) {
            message.success('修改成功');
            runInAction(() => {
                switch (params.type) {
                    case 'pwd':
                        break;
                    case 'city':
                        this.user['default_city'] = params.cityName
                        this.user['default_city_code'] = params.cityCode
                        this.currDefaultCity = params.cityName
                        break;
                    case 'day':
                        this.user['default_day'] = params.day
                        break;
                    case 'login':
                        this.user['auto_login'] = params.autoLogin
                        break;
                    default:
                        break;
                }
            })
            return true
        } else {
            return false
        }
    }

    setHistoryData(data) {
        this.historyData = data
    }

    logout() {
        window.localStorage.removeItem('token');
        this.user = null;
        this.currDefaultCity = ''
        message.success('登出成功');
    }
}

export default new UserStore()