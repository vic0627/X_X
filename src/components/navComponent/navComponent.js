import { x_x } from "../../../modules/X_X.js";
const { ref } = x_x;

const navNode = {
  tag: "header",
  attrs: {
    class: "nav-component",
  },
};
const NavComponent = x_x
  .createNode(navNode)
  .linkCSS("@/src/components/navComponent/navComponent.css")
  .addTo(x_x);

const navH1Node = {
  tag: "h1",
  attrs: {
    class: "nav-h1",
    to: "/"
  },
  innerText: "X_X",
};
const navH1 = x_x.createNode(navH1Node).addTo(NavComponent);

const navAboutNode = {
  tag: "p",
  attrs: {
    class: "nav-about",
    to: "/about"
  },
  innerText: "about",
};
const navAbout = x_x.createNode(navAboutNode).addTo(NavComponent);

export default NavComponent;
