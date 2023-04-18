import XRouter from "../modules/XRouter/XRouter.js";
import Landing from "../src/pages/landing/landing.js";
import About from "../src/pages/about/about.js";

const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
];

const xr = new XRouter(routes);

export default xr;
