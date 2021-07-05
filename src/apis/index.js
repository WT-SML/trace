import { request } from "../utils/http.js";

// 获取游戏列表
export const getGameList = (params) =>
  request({
    url: "/games",
    params,
  });
