import X_X from "../../../modules/X_X.js";

const AboutX_X = new X_X("main", { class: "about" }).linkCSS(
  "@/src/pages/about/aboutX_X.css"
);

const aboutH2 = AboutX_X.createChild("h1", {
  class: "about-h2",
}).text("About me");

const aboutP = AboutX_X.createChild("p", {
  class: "about-p",
}).text(
  "Introducing X_X, the revolutionary new front-end framework designed to streamline web development like never before.\n\nX_X is a lightweight and flexible framework that combines the power of JavaScript with the simplicity of HTML and CSS. It is designed to help developers create responsive and interactive web applications with ease."
);

export default AboutX_X;