import x_x from "../../../main.js";

const NavComponent = x_x
  .createChild("header", { class: "nav-component" })
  .linkCSS("@/src/components/navComponent/navComponent.css");

const navH1 = NavComponent.createChild("h1", { class: "nav-h1", to: "/" }).text("X_X");

const nav = NavComponent.createChild("nav", {class: "nav-nav"}).a
export default NavComponent;
