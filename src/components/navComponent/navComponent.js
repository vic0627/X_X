import X_X from "../../../modules/X_X.js";

const NavComponent = new X_X("header", { class: "nav-component" })
  .linkCSS("@/src/components/navComponent/navComponent.css");

const navH1 = NavComponent.createChild("h1", { class: "nav-h1", to: "/" }).text("X_X");

const navAbout = NavComponent.createChild("p", {class: "nav-about"}).text("about");
export default NavComponent;
