import { extend } from 'umi-request';
import { encode } from '../util/token';

const errorHandler = error => {
    const { data = {} } = error;
    let msg = '网络错误'
    if (data.msg instanceof Array && data.msg.length > 0) {
        msg = data.msg.join(',');
    }
    if (typeof (data.msg) === "string") {
        msg = data.msg;
    }
    console.log(data);
}

const request = extend({
    headers: {
        'Authorization': encode(window.localStorage.getItem('token'))
    },
    timeout: 10000, // 如超时，则请求中断，抛出异常
    errorHandler //错误处理
});

export const get = (url = '', params = null) => {
    return request(url, {
        method: 'get',
        params: {
            ...params
        }
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        errorHandler(error);
    })
}

export const post = (url = '', params = {}) => {
    return request(url, {
        method: 'post',
        data: params
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        errorHandler(error);
    })
}