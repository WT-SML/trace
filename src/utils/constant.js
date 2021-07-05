/**
 * 常量
 */

// API接口基础地址
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.trace.sumoli.com/"
    : "http://localhost:4000/";

export const SITE_RECORD_NUM = "鲁ICP备19054708号-1"; // 网站备案信息
