import env from '../../build/env';
import axios from 'axios/index';

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:3000'
    : env === 'production'
        ? 'https://www.url.com'
        : 'https://debug.url.com';

const nameSpace = '/api/v0/';

const ajax = axios.create({
    baseURL: ajaxUrl + nameSpace,
    timeout: 10000
});

ajax.interceptors.response.use(
    response => {
        if (!response.data) {
            return Promise.reject('请求失败');
        }
        const { status } = response.data;
        if (status === 'fail') {
            const { data } = response.data;
            const msg = data.message || '请求失败';
            return Promise.reject(msg);
        }
        return response.data.data;
    },
    error => {
        if (error.message &&
            error.message.indexOf('timeout') !== -1) {
            return Promise.reject('请求超时');
        } else
        if (error.message &&
            error.message.indexOf('Network Error') !== -1) {
            return Promise.reject('网络异常');
        }
        return Promise.reject('服务异常');
    },
);

const req = async (option, vm) => {
    try {
        let res = null;
        if (option.method === 'get') {
            res = await ajax.get(option.url, {params: option.params});
        } else {
            res = await ajax.post(option.url, option.params);
        }
        option.success.call(vm, res);
    } catch (e) {
        if (option.fail) {
            option.fail.call(vm, e);
        } else {
            vm.$Message.error({
                content: e,
            });
        }
    } finally {
        if (option.finally) {
            option.finally.call(vm);
        }
    }
}

const ajaxGet = (option, vm) => {
    const op = Object.assign(option, {method: 'get'});
    req(op, vm);
}
const ajaxPost = (option, vm) => {
    const op = Object.assign(option, {method: 'post'});
    req(op, vm);
}
export {
    ajax,
    ajaxGet,
    ajaxPost
};
