import axios from "axios";
import { GetToken, GetUserId, GetUserEmail } from "./app";
import router from "../router";

const service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "X-Custom-Header": "foobar",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS, POST"
  }
});

//添加请求拦截器
service.interceptors.request.use(
  function(config) {
    config.headers["token"] = GetToken();
    config.headers["userid"] = GetUserId();
    config.headers["uesremail"] = GetUserEmail();
    //发送前
    return config;
  },
  function(error) {
    //发生错误
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function(response) {
    //响应数据处理
    let data = response.data;
    if (data.result == false) {
      return Promise.reject(data);
    } else {
      return data;
    }
  },
  function(error) {
    //响应错误处理
    return Promise.reject(error);
  }
);

export default service;
