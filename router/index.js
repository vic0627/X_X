import XRouter from "../modules/XRouter/XRouter.js";

const routes = [
  {
    path: "/",
    name: "landing",
    component: "@/src/pages/landing/landingX_X.js",
  },
];

const xr = new XRouter(routes);

export default xr;
