import XRouter from "../modules/XRouter/XRouter.js";
import LandingX_X from "../src/pages/landing/landingX_X.js";
import AboutX_X from "../src/pages/about/aboutX_X.js";
const routes = [
  {
    path: "/X_X/",
    name: "landing",
    component: LandingX_X,
  },
  {
    path: "/X_X/about",
    name: "about",
    component: AboutX_X,
  },
];

const xr = new XRouter(routes);

export default xr;
