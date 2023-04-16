import { delay, reCall } from "./timer/timer.js";
import { reDirectUrl } from "./url/url.js";
import { reactive } from "./state/state.js";

const tt = reactive();

function getKeyArray(obj, arr) {
  for (let key in obj) {
    if (obj[key] instanceof Object && key !== "x_model") {
      if ("_isProxy" in obj[key] && !arr.includes(key)) {
        arr.push(key);
      } else {
        getKeyArray(obj[key]);
      }
    }
  }
}

class X_X {
  constructor({ tag, attrs, innerText, events }) {
    // DOM
    this.root = null; // root DOM
    this.element = null; // real DOM
    this.children = []; // DOM tree of "this"
    this.vNode = {
      tag,
      attrs,
      innerText,
      events,
    }; // virtual DOM
    this.needObserved = [];
    // hooks
    this.isSetup = false;
    this.isBeforeMount = false;
    this.isMounted = false;
    this.isBeforeUpdate = false;
    this.isUpdated = false;
    this.isBeforeDestroy = false;
    this.isDestroyed = false;
    return this;
  }

  log() {
    console.log(this);
    return this;
  }

  // 抓根元素，初始化頁面。
  mount(root) {
    if (this.root) return;
    let rootElement;
    if (root.includes("#")) {
      rootElement = document.querySelector(root);
    } else {
      rootElement = document.getElementById(root);
    }
    this.root = rootElement;
    this.element = rootElement;
    if (this.children.length !== 0) {
      this.children.forEach((el) => {
        el.create();
      });
      this.renderFullTree();
    }
    return this;
  }

  // 創新實例
  createNode(vNode = {}) {
    return new X_X(vNode);
  }

  // 插入父節點
  addTo(parent) {
    if (parent instanceof X_X) {
      parent.children.push(this);
    } else {
      throw new Error(`${parent} is not an instance of X_X.`);
    }
    return this;
  }

  // 插入子節點
  add(child) {
    if (child instanceof X_X) {
      this.children.push(child);
    } else {
      throw new Error(`${child} is not an instance of X_X.`);
    }
  }

  // 建立 real DOM
  create() {
    const { tag, attrs, innerText, events } = this.vNode;
    if (tag) {
      this.element = document.createElement(tag);
    }
    if (!this.element) return;
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        if (key === "x_model" && this.element.tagName === "INPUT") {
          // console.log(attrs[key]);
          this.element.value = attrs[key].value;
          this.element.addEventListener("input", (e) => {
            attrs[key].value = e.target.value;
          });
        } else {
          this.element.setAttribute(key, attrs[key]);
        }
      });
    }
    if (events) {
      // console.log(events);
      events.forEach((e) => {
        this.element.addEventListener(e.type, e.handler);
      });
    }
    if (innerText) {
      if (
        Object.getPrototypeOf(innerText) ===
          Object.getPrototypeOf(reactive()) &&
        innerText.value
      ) {
        this.element.innerText = innerText.value;
      } else if (typeof text !== "object") {
        this.element.innerText = innerText;
      }
    }
  }

  // 渲染全 DOM Tree
  renderFullTree() {
    if (this.children.length !== 0) {
      this.children.forEach((el) => {
        this.element.appendChild(el.element);
        // console.log(el);
        if (el.children.length !== 0) {
          el.children.forEach((els) => {
            els.create();
          });
          el.renderFullTree();
        }
      });
    }
  }
  ref = (ref) =>
    reactive(ref, (prop, value) => {
      this.children.forEach((el) => {
        getKeyArray(el.vNode, el.needObserved);
        if (el.needObserved.length > 0) console.log(el.needObserved);
        el.needObserved.forEach((key) => {
          el.element[key] = value;
        });
      });
    });
  text(t) {
    this.element.innerText = t;
  }
}
const x_x = new X_X({});

export { x_x };
