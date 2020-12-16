import { makeAutoObservable, runInAction } from 'mobx'
import { message } from 'antd'
import { get, post } from '../util/request'
import { API_USER_LOGIN, API_USER_TOKEN_LOGIN, API_USER_TOKEN_REGISTER } from '../constant/urls'

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    user = null

    async register(params) {
        const data = await post(API_USER_TOKEN_REGISTER, params);
        if (data) {
            message.success('注册成功');
            return true
        } else {
            return false
        }
    }

    async login(params) {
        const data = await post(API_USER_LOGIN, params);
        if (data) {
            window.localStorage.setItem('token', data.token);
            runInAction(() => {
                this.user = { data };
            })
            message.success('登录成功');
        }
    }

    async loginWithToken() {
        const data = await get(API_USER_TOKEN_LOGIN);
        if (data) {
            runInAction(() => {
                this.user = data
            })
            message.success('登录成功');
        }
    }

    logout() {
        window.localStorage.removeItem('token');
        this.user = null;
        message.success('登出成功');
    }
}

export default new UserStore()