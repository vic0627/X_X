import { x_x } from "./modules/X_X.js";
import xr from "./router/index.js";
import NavComponent from "./src/components/navComponent/navComponent.js";

x_x.linkCSS("@/style.css").useRouter(xr).mount("X_X");
