import emitter from "./emitter.js";

/**
 * 动态添加脚本
 * @author wutong
 * @param {String} src
 * @param {String} type
 * @returns {Promise}
 */
export const loadScript = (src, type = "script") =>
  new Promise((resolve, reject) => {
    if (type !== "script" && type !== "link") {
      const error = new Error("The script type must be is script or link");
      throw error;
    }
    const script = window.document.createElement(type);
    if (type === "script") {
      script.src = src;
    } else {
      script.href = src;
      script.rel = "stylesheet";
    }
    const t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(script, t);
    script.onload = () => {
      resolve();
    };
  });
/**
 * 展示一个消息
 * @author wutong
 * @param {Object}
 * @returns {void}
 */
export const msg = ({ msg = "默认消息", type = "info", delay = 2000 }) => {
  emitter.emit("showMsg", { msg, type, delay });
};
/**
 * 进行安全验证
 * @author wutong
 * @returns {Promise}
 */
export const safetyVerification = () =>
  new Promise((resolve, reject) => {
    const closeListener = () => {
      emitter.off("safetyVerificationSuccess");
      emitter.off("safetyVerificationError");
    };
    emitter.emit("safetyVerification");
    emitter.on("safetyVerificationSuccess", () => {
      closeListener();
      resolve();
    });
    emitter.on("safetyVerificationError", () => {
      closeListener();
      reject();
    });
  });
