import XRouter from "../modules/XRouter/XRouter.js";
import { reDirectUrl } from "../modules/url/url.js";
const routes = [
  {
    path: "/X_X",
    name: "landing",
    component: () => import(reDirectUrl("@/src/pages/landing/landingX_X.js")),
  },
];

const xr = new XRouter(routes);

export default xr;
