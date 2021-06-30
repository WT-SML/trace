/**
 * 动态添加脚本
 * @author wutong
 * @param {String} src
 * @param {String} type
 * @returns {Promise}
 */
export const $setScript = (src, type = "script") =>
  new Promise((resolve) => {
    if (type !== "script" && type !== "link") {
      return alert("The script type must be is script or link");
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
      resolve(true);
    };
  });
