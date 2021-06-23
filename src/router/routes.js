const routes = [
  // index
  {
    path: "/",
    name: "index",
    component: () => import("../pages/common/index.vue"),
    meta: {},
  },
  // games
  {
    path: "/g",
    name: "games",
    component: () => import("../pages/common/games.vue"),
    meta: { title: "游戏", keepAlive: true },
  },
  // game detail
  {
    path: "/g/:gid",
    name: "gameDetail",
    component: () => import("../pages/common/index.vue"),
  },
  // user detail
  { path: "/u/:uid" },
];
export default routes;
