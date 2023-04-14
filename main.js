import X_X from "./modules/X_X.js";
import xr from "./router/index.js";
const x_x = new X_X("#X_X");
x_x.use(xr).linkCSS("@/style.css").mount().log();
export default x_x;
