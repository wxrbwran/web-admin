import Main from '@/pages/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/pages/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/pages/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//pages/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/pages/error-page/500.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/pages/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/pages/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/pages/own-space/own-space.vue'], resolve); } },
        { path: 'article_edit/:id', title: '编辑新闻', name: 'article_edit', component: resolve => { require(['@/pages/article/article-edit.vue'], resolve); } },
        { path: 'position_edit/:id', title: '编辑招聘信息', name: 'position_edit', component: resolve => { require(['@/pages/position/position-edit.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/article',
        icon: 'android-checkbox',
        name: 'article',
        title: '新闻',
        component: Main,
        children: [
            { path: 'publish', title: '发布新闻', name: 'article_publish', icon: 'compose', component: resolve => { require(['@/pages/article/article-publish.vue'], resolve); } },
            { path: 'list', title: '新闻列表', name: 'article_list', icon: 'ios-list-outline', component: resolve => { require(['@/pages/article/article-list.vue'], resolve); } }
        ]
    },
    {
        path: '/position',
        icon: 'android-checkbox',
        name: 'position',
        title: '招聘',
        component: Main,
        children: [
            { path: 'publish', title: '发布职位', name: 'position_publish', icon: 'compose', component: resolve => { require(['@/pages/position/position-publish.vue'], resolve); } },
            { path: 'list', title: '职位列表', name: 'position_list', icon: 'ios-list-outline', component: resolve => { require(['@/pages/position/position-list.vue'], resolve); } }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
