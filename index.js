import { x_x } from "./modules/X_X.js";

const titleNode = {
  tag: "h1",
  attrs: {
    class: "x_x-h1",
    id: "x_x-h1",
  },
  text: "X_X Framework",
};

const title = x_x.createNode(titleNode).addTo(x_x);

const numNode = {
  tag: "input",
  attrs: {
    type: "number",
    class: "x_x-num",
    id: "x_x-num",
    value: 0,
  },
};

const num = x_x.createNode(numNode).addTo(x_x);

x_x.mount("X_X");
