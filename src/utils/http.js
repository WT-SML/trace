/**
 * http相关
 */

import axios from "axios";
import { API_BASE_URL } from "./constant.js";

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
          alert(JSON.stringify(err.response.data));
        }
        if (
          err.response.status === 403 ||
          err.response.status === 405 ||
          err.response.status === 409
        ) {
          alert(err.response.data.msg || "未知错误");
        }
        if (err.response.status === 404) {
          alert("抱歉！未找到相关数据。");
        }
        if (err.response.status === 500) {
          alert(err.response.data.msg || "服务器错误");
        }
        if (err.response.status === 503) {
          alert("服务器可能正在维护，请稍后再试！");
        }
      } else {
        if (err.message.includes("timeout")) {
          alert("请求网络超时，请检查网络后重试");
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
