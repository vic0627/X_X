import { x_x } from "./modules/X_X.js";
const { ref } = x_x;
const titleNode = {
  tag: "h1",
  attrs: {
    class: "x_x-h1",
    id: "x_x-h1",
  },
  innerText: "X_X Framework",
};

const title = x_x.createNode(titleNode).addTo(x_x);

const testText = ref("asd");

const inputNode = {
  tag: "input",
  attrs: {
    type: "text",
    class: "x_x-input",
    x_model: testText,
  },
};
const input = x_x.createNode(inputNode).addTo(x_x);

const pNode = {
  tag: "p",
  attrs: {
    class: "x_x-p",
  },
  innerText: testText,
};
const p = x_x.createNode(pNode).addTo(x_x);

x_x.mount("X_X");
