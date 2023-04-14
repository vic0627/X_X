import { delay, reCall } from "./timer/timer.js";
import { reDirectUrl } from "./url/url.js";
import XRouter from "./XRouter/XRouter.js";
export default class X_X {
  constructor(el = "div", attrs = {}, events = []) {
    this.element = null; // real DOM
    this.children = []; // DOM tree of "this"
    this.vNode = { el, attrs }; // virtual DOM
    this.events = events; // types & handler

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
  createNode(el = "div", attrs = {}, events = []) {
    return new X_X(el, attrs, events);
  }
  createChild(el = "div", attrs = {}, events = []) {
    return new X_X(el, attrs, events).addTo(this);
  }
  stylesheet = null;
  linkCSS(href) {
    this.stylesheet = document.createElement("link");
    this.stylesheet.href = reDirectUrl(href);
    this.stylesheet.rel = "stylesheet";
    return this;
  }
  setupcallback = null;
  onBeforeMountcallback = null;
  onMountedcallback = null;
  setup(callback = () => {}) {
    this.setupcallback = () => {
      this.isSetup = true;
      callback();
      this.isSetup = false;
    };
    return this;
  }
  onBeforeMount(callback = () => {}) {
    this.onBeforeMountcallback = () => {
      this.isBeforeMount = true;
      callback();
      this.isBeforeMount = false;
    };
    return this;
  }
  onMounted(callback = () => {}) {
    this.onMountedcallback = () => {
      this.isMounted = true;
      callback();
    };
    return this;
  }
  mount(parent) {
    if (this.router) this.children.push(this.router.currentRoute.component);
    const { el, attrs } = this.vNode;
    const isSelector = el.includes("#") || el.includes(".");
    isSelector
      ? (this.element = document.querySelector(el))
      : (this.element = document.createElement(el));
    if (attrs)
      Object.keys(attrs).forEach((key) => {
        this.element.setAttribute(key, attrs[key]);
      });
    if (this.events) {
      this.events.map((e) => {
        this.element.addEventListener(e.type, e.callback);
      });
    }

    if (this.stylesheet) document.head.appendChild(this.stylesheet);
    if (this.setupcallback) this.setupcallback();
    if (parent instanceof X_X) parent.element.appendChild(this.element);
    if (this.children)
      this.children.map((el) => {
        el.mount(this);
      });
    if (this.onBeforeMountcallback) this.onBeforeMountcallback();
    if (this.onMountedcallback) delay(this.onMountedcallback, 10);
    // console.log("mounted");
    return this;
  }
  add(children) {
    if (children instanceof X_X) {
      this.children.push(children);
    } else if (children instanceof Array) {
      children.forEach((el) => {
        this.children.push(el);
      });
    } else {
      throw new Error("低能嗎?");
    }
    return this;
  }
  addTo(parent) {
    if (parent instanceof X_X) {
      parent.add(this);
    } else {
      throw new Error("低能嗎?");
    }
    return this;
  }
  remove(child) {
    child ? this.element.removeChild(child) : this.element.remove();
    if (this.stylesheet) this.stylesheet.remove();

    return this;
  }
  use(plugin) {
    if (plugin instanceof XRouter) {
      this.router = plugin;
    }
    return this;
  }
  class(className, add = true) {
    add
      ? this.element.classList.add(className)
      : this.element.classList.remove(className);
    return this;
  }
  attr(attrs = {}) {
    Object.keys(attrs).forEach((key) => {
      this.element.setAttribute(key, attrs[key]);
    });
    return this;
  }
  text(para) {
    reCall((timer) => {
      if (this.element) {
        this.element.innerText = para;
        clearInterval(timer);
      }
    });
    return this;
  }
  html(para) {
    this.element.innerHTML = para;
    return this;
  }
  style(attr, value) {
    this.element.style[attr] = value;
    return this;
  }
  transform(trans) {
    this.element.style.transform = trans;
    return this;
  }
  on(event, callback) {
    this.element.addEventListener(event, callback);
    this.events.push({ event, callback });
    return this;
  }
  off(event, callback) {
    if (this.events) {
      const cache = this.events;
      cache.map((val) => {
        this.element.removeEventListener(val.event, val.callback);
        this.events.shift();
      });
    } else if (event && callback) {
      this.element.removeEventListener(event, callback);
    } else {
      throw new Error("沒有註冊事件!");
    }
    return this;
  }
}
