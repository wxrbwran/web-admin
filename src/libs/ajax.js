import axios from 'axios/index';

let ajaxUrl = 'http://127.0.0.1:3000';

if (process.env.NODE_ENV === 'production') {
    ajaxUrl = 'https://*.*.com';
    // ajaxUrl = 'https://localhost:8888';
}

const nameSpace = '/api/v0/';

const ajax = axios.create({
    baseURL: ajaxUrl + nameSpace,
    timeout: 5000
});


const auth = axios.create({
    baseURL: ajaxUrl,
    timeout: 5000
});

let $vm = null;

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
        const { message } = error;
        if (!!message) {
            if (message.indexOf('timeout') !== -1) {
                return Promise.reject('请求超时');
            } else if (message.indexOf('Network Error') !== -1) {
                return Promise.reject('网络异常');
            } else if ($vm && message.indexOf('403') !== -1) {
                $vm.$router.push({
                    name: 'error-403'
                });
            } else if ($vm && message.indexOf('500') !== -1) {
                $vm.$router.push({
                    name: 'error-500'
                });
            }
        }
        return Promise.reject('服务异常');
    },
);

const req = async (option, vm, instance) => {
    $vm = vm;
    try {
        let res = null;
        switch (option.method) {
            case 'get' :
                res = await ajax.get(option.url, {params: option.params});
                break;
            default :
                res = await instance[option.method](option.url, option.params);
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

const methods = ['Get', 'Post', 'Patch', 'Delete'];

const ajaxMethods = {};
const authMethods = {};

methods.forEach(method => {
    ajaxMethods[`ajax${method}`] = (option, vm) => {
        const op = Object.assign(option,
            {method: method.toLowerCase()});
        req(op, vm, ajax);
    };
    authMethods[`ajax${method}`] = (option, vm) => {
        const op = Object.assign(option,
            {method: method.toLowerCase()});
        req(op, vm, auth);
    };
});

const ajaxGet = ajaxMethods.ajaxGet;
const ajaxPost = ajaxMethods.ajaxPost;
const ajaxPatch = ajaxMethods.ajaxPatch;
const ajaxDelete = ajaxMethods.ajaxDelete;

const authPost = authMethods.ajaxPost;

function setAjaxHeader (token) {
    ajax.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export {
    ajax,
    auth,
    ajaxGet,
    ajaxPost,
    authPost,
    ajaxPatch,
    ajaxDelete,
    ajaxUrl,
    setAjaxHeader
};
