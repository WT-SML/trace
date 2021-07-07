import { request } from "../utils/http.js";

// 获取游戏列表
export const getGameList = (params) =>
  request({
    url: "/games",
    params,
  });
// 获取内容
export const getContent = (contentId, params) =>
  request({
    url: `/content/${contentId}`,
    params,
  });
