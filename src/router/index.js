import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@v/Layout/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页",
      icon: "el-icon-s-help"
    }
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    meta: {
      name: "登录",
      icon: "el-icon-lock"
    },
    component: () => import("@v/Login/index.vue")
  },
  {
    path: "/console",
    name: "console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "console"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "indxe",
        meta: {
          name: "首页",
          icon: "el-icon-star-on"
        },
        component: () => import("@v/Console/index.vue")
      }
    ]
  },
  {
    path: "/info",
    name: "info",
    meta: {
      name: "信息管理",
      icon: "info"
    },
    component: Layout,
    children: [
      {
        path: "/infolist",
        name: "infolist",
        meta: {
          name: "信息列表"
        },
        component: () => import("@v/Info/infoList.vue")
      },
      {
        path: "/infoCategory",
        name: "infoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("@v/Info/category.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "user",
    meta: {
      name: "用户管理",
      icon: "user"
    },
    component: Layout,
    children: [
      {
        path: "/userlist",
        name: "userlist",
        meta: {
          name: "用户列表"
        },
        component: () => import("@v/User/userList.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
