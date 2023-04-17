import { x_x } from "../../../modules/X_X.js";

const landingNode = {
  tag: "main",
  attrs: {
    class: "landing",
  },
};
const Landing = x_x
  .createNode(landingNode)
  .linkCSS("@/src/pages/landing/landing.css");

const landingH2Node = {
  tag: "h2",
  attrs: {
    class: "landing-h2",
  },
  innerText: "The Next Generation Of Frontend Framework.",
};
const landingH2 = x_x.createNode(landingH2Node).addTo(Landing);

const landingPNode = {
  tag: "p",
  attrs: {
    class: "landing-p",
  },
  innerText:
    "Introducing X_X, the revolutionary new front-end framework designed to streamline web development like never before.\n\nX_X is a lightweight and flexible framework that combines the power of JavaScript with the simplicity of HTML and CSS. It is designed to help developers create responsive and interactive web applications with ease.\n\nOne of the standout features of X_X is its modular architecture. X_X allows developers to build web applications with reusable and interchangeable components, which makes code maintenance and scaling much easier.\n\nAnother key feature of X_X is its support for reactive programming. This means that X_X applications can automatically update the user interface in response to changes in the data or the user's input, without the need for explicit DOM manipulation.\n\nX_X also comes with a wide range of tools and utilities to help developers optimize their workflow. This includes a robust command-line interface for scaffolding and building projects, as well as a built-in testing framework for ensuring code quality and reliability.\n\nIn summary, X_X is a powerful and versatile front-end framework that empowers developers to build web applications quickly and efficiently. With its modular architecture, reactive programming support, and developer-friendly tools, X_X is poised to become the go-to choice for front-end development in the years to come.",
};
const landingP = x_x.createNode(landingPNode).addTo(Landing);

export default Landing;
