/**
 * http相关
 */

import axios from "axios";
import { API_BASE_URL } from "./constant.js";
import { msg } from "./index.js";

/**
 * axios二次封装
 * @author wutong
 * @param {AjaxObject} obj
 * @param {CallbackFunction} success
 * @param {CallbackFunction} error
 * @param {CallbackFunction} final
 * @returns {void}
 */
export const myAxios = (obj, success, error, final) => {
  let config = {
    withCredentials: true,
    baseURL: API_BASE_URL,
    timeout: 15000,
  };
  let axiosInstance = axios.create(config);
  axiosInstance(obj)
    .then((res) => {
      if (success) {
        success(res.data, res);
      }
    })
    .catch((err) => {
      if (error) {
        if (typeof error === "object") {
          error.handler(err);
          return false;
        } else if (typeof error === "function") {
          error(err);
        }
      }
      if (err.response) {
        if (err.response.status === 401) {
          alert("登录身份失效，需要重新登录");
          localStorage.removeItem("user");
          location.reload();
        }
        if (err.response.status === 422) {
          msg({
            msg: JSON.stringify(err.response.data),
            type: "error",
          });
        }
        if (
          err.response.status === 403 ||
          err.response.status === 405 ||
          err.response.status === 409
        ) {
          msg({
            msg: err.response.data.msg || "未知错误",
            type: "error",
          });
        }
        if (err.response.status === 404) {
          msg({
            msg: "抱歉！未找到相关数据",
            type: "error",
          });
        }
        if (err.response.status === 500) {
          msg({
            msg: err.response.data.msg || "服务器错误",
            type: "error",
          });
        }
        if (err.response.status === 503) {
          msg({
            msg: "服务器可能正在维护，请稍后再试",
            type: "error",
          });
        }
      } else {
        // 处理超时
        if (err.message.includes("timeout")) {
          msg({
            msg: "请求网络超时，请检查网络后重试",
            type: "error",
          });
        }
        // 处理其他的请求失败
        else if (err.message.includes("Network Error")) {
          msg({
            msg: err,
            type: "error",
          });
        }
        console.warn("errMsg:", err.message);
      }
      console.warn("errConf:", err.config);
    })
    .finally((err) => {
      if (final) {
        final(err);
      }
    });
};

export const request = (obj) =>
  new Promise((resolve, reject) => {
    myAxios(
      obj,
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
