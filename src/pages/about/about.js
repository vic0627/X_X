import { x_x } from "../../../modules/X_X.js";

const aboutNode = {
  tag: "main",
  attrs: {
    class: "about",
  },
};
const About = x_x.createNode(aboutNode).linkCSS("@/src/pages/about/about.css");

const aboutH2Node = {
  tag: "h2",
  attrs: {
    class: "about-h2",
  },
  innerText: "About me",
};
const aboutH2 = x_x.createNode(aboutH2Node).addTo(About);

const aboutPNode = {
  tag: "p",
  attrs: {
    class: "about-p",
  },
  innerText:
    "Introducing X_X, the revolutionary new front-end framework designed to streamline web development like never before.\n\nX_X is a lightweight and flexible framework that combines the power of JavaScript with the simplicity of HTML and CSS. It is designed to help developers create responsive and interactive web applications with ease.",
};
const aboutP = x_x.createNode(aboutPNode).addTo(About);


export default About;
