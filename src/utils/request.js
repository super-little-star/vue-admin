import axios from "axios";
import { Message } from "element-ui";

const service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
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
    return response;
  },
  function(error) {
    //响应错误处理
    return Promise.reject(error);
  }
);

export default service;
