let homeRedirectPath = "/index";
if (localStorage.getItem("currentGame")) {
  const currentGame = JSON.parse(localStorage.getItem("currentGame"));
  homeRedirectPath = `/g/${currentGame.gid}`;
}

const routes = [
  // home
  {
    path: "/",
    name: "home",
    redirect: homeRedirectPath,
    meta: {},
  },
  // index
  {
    path: "/index",
    name: "index",
    component: () => import("../pages/common/index.vue"),
    meta: {
      keepAlive: true,
    },
  },
  // game detail
  {
    path: "/g/:gid",
    name: "gameDetail",
    component: () => import("../pages/common/game-index.vue"),
  },
  // content detail
  {
    path: "/c/:cid",
    props: true,
    name: "contentDetail",
    component: () => import("../pages/common/content.vue"),
  },
  // user detail
  { path: "/u/:uid" },
  // search
  { path: "/search" },
  // 《痕迹社区用户服务协议》
  { path: "/terms" },
  // 《痕迹社区个人信息及隐私保护政策》
  { path: "/privacy" },
];
export default routes;
