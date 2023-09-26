export const constantRouters = [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            hidden: false,
            icon: 'HomeFilled'
        },
        redirect: "/home",
        children: [
            {
                path: '/home',
                name: "home",
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: "首页",
                    hidden: false,
                    icon: 'HomeFilled'
                }
            },
        ]
    }, {
        path: "/screen",
        name: 'Screen',
        component: () => import("@/views/screen/index.vue"),
        meta: {
            title: "数据大屏",
            hidden: false,
            icon: 'DataAnalysis'
        }
    }, {
        path: "/acl",
        name: 'Acl',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: "权限管理",
            hidden: false,
            icon: 'Lock'
        },
        redirect: "/acl/user",
        children: [{
            path: "/acl/user",
            name: 'Acl',
            component: () => import("@/views/acl/user/index.vue"),
            meta: {
                title: "用户管理",
                hidden: false,
                icon: 'User'
            }
        }, {
            path: "/acl/role",
            name: 'Role',
            component: () => import("@/views/acl/role/index.vue"),
            meta: {
                title: "角色管理",
                hidden: false,
                icon: 'UserFilled'
            }
        }, {
            path: "/acl/permission",
            name: 'Permission',
            component: () => import("@/views/acl/permission/index.vue"),
            meta: {
                title: "菜单管理",
                hidden: false,
                icon: 'Monitor'
            }
        }]
    }, {
        path: "/product",
        name: 'Product',
        component: () => import('@/layout/index.vue'),
        redirect: '/product/trandemark',
        meta: {
            title: "商品管理",
            hidden: false,
            icon: "Goods"
        },
        children: [{
            path: '/product/trandemark',
            name: "Trandemark",
            component: () => import("@/views/product/trandemark/index.vue"),
            meta: {
                title: '品牌管理',
                hidden: false,
                icon: "ShoppingCart"
            }
        }, {
            path: '/product/attr',
            name: "Attr",
            component: () => import("@/views/product/attr/index.vue"),
            meta: {
                title: '属性管理',
                hidden: false,
                icon: "ShoppingCartFull"
            }
        }, {
            path: '/product/spu',
            name: "Spu",
            component: () => import("@/views/product/spu/index.vue"),
            meta: {
                title: 'SPU管理',
                hidden: false,
                icon: "Menu"
            }
        }, {
            path: '/product/sku',
            name: "Sku",
            component: () => import("@/views/product/sku/index.vue"),
            meta: {
                title: 'SKU管理',
                hidden: false,
                icon: "Menu"
            }
        }]
    }, {
        path: '/404',
        component: () => import("@/views/404/index.vue"),
        name: '404',
        meta: {
            title: "404",
            hidden: true,
            icon: "Menu"
        }
    }, {
        path: '/login',
        component: () => import("@/views/login/login.vue"),
        name: "login",
        meta: {
            title: '登录',
            hidden: true,
            icon: "Menu"
        },
    }, {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
        meta: {
            title: '错误路由',
            hidden: true,
            icon: "Menu"
        },
    },
]