import X_X from "./modules/X_X.js";
import xr from "./router/index.js";
import NavComponent from "./src/components/navComponent/navComponent.js";
const x_x = new X_X("#X_X");
x_x.add(NavComponent);
x_x.use(xr).linkCSS("@/style.css").mount();
export default x_x;
