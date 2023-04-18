import { delay, reCall } from "./timer/timer.js";
import { reDirectUrl } from "./url/url.js";
import { reactive, updateDOM } from "./state/reactive.js";
import { s } from "./hooks/hooks.js";

let root = null; // root DOM

class X_X {
  constructor({ tag, attrs, innerText, events }) {
    // DOM
    this.element = null; // real DOM
    this.children = []; // DOM tree of "this"
    this.vNode = {
      tag,
      attrs,
      innerText,
      events,
    }; // virtual DOM
    // ref
    this.needObserved = [];
    this.compareObserved = [];
    // CSS
    this.stylesheet = null;
    this.router = null;
    // hooks
    this.isSetup = false;
    this.isBeforeMount = false;
    this.isMounted = false;
    this.isBeforeUpdate = false;
    this.isUpdated = false;
    this.isBeforeDestroy = false;
    this.isDestroyed = true;
    return this;
  }

  log() {
    console.log(this);
    return this;
  }

  // 抓根元素，初始化頁面。
  mount(tag) {
    if (root) return;
    let rootElement;
    if (tag.includes("#")) {
      rootElement = document.querySelector(tag);
    } else {
      rootElement = document.getElementById(tag);
    }
    root = rootElement;
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
  addTo(parent = root) {
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
    // 從 vNode 取出資料。
    const { tag, attrs, innerText, events } = this.vNode;

    // tag 存在，就建立 real DOM 放到 this.element。
    if (tag) this.element = document.createElement(tag);
    // this.element 未被定義就返回。
    if (!this.element) return;

    // 標籤屬性。
    if (attrs) {
      // 遍歷 attrs 物件。
      Object.keys(attrs).forEach((key) => {
        // 若屬性為 x_model 且此 real DOM 為 input，給予初值並掛載監聽。
        if (
          key === "x_model" &&
          this.element.tagName === "INPUT" &&
          attrs[key]._isProxy
        ) {
          this.element.value = attrs[key].value;
          this.element.addEventListener("input", (e) => {
            attrs[key].value = e.target.value;
          });
          // 若其他任意屬性之值為 ref，將 ref 值取出並放到原狀態陣列。
        } else if (attrs[key] instanceof Object && attrs[key]._isProxy) {
          this.compareObserved.push({ key, value: attrs[key].value });
          if (attrs[key].value)
            this.element.setAttribute(key, attrs[key].value);
        } else if (key === "to") {
          this.element.addEventListener("click", () => {
            x_x.router.navigate(attrs[key]);
          });
        } else {
          this.element.setAttribute(key, attrs[key]);
        }
      });
    }

    // 遍歷事件監聽陣列，依序掛載。
    if (events) {
      events.forEach((e) => {
        this.element.addEventListener(e.type, e.handler);
      });
    }

    if (innerText) {
      // 若值為 ref，，將 ref 值取出放到原狀態陣列，再設定 DOM。
      if (innerText._isProxy && innerText.value) {
        this.compareObserved.push({ key: "innerText", value: innerText.value });
        this.element.innerText = innerText.value;
      } else if (typeof text !== "object") {
        this.element.innerText = innerText;
      }
    }

    if (this.children.length !== 0) {
      this.children.forEach((els) => {
        els.create();
        if (els.stylesheet) document.head.appendChild(els.stylesheet);
      });
    }

    if (this.s) this.s();
    this.isSetup = true;
    this.isDestroyed = false;
  }

  // 渲染全 DOM Tree
  renderFullTree(instance = this) {
    if (instance.bm) instance.bm();
    this.isBeforeMount = true;
    // 有子節點就遍歷子節點，並掛載 DOM。
    if (instance.stylesheet) document.head.appendChild(instance.stylesheet);
    if (instance.children.length !== 0) {
      instance.children.forEach(async (el) => {
        if (el.stylesheet) document.head.appendChild(instance.stylesheet);
        instance.element.appendChild(el.element);
        // 若子節點還有子節點，就遞迴下去。
        if (el.children.length !== 0) el.renderFullTree();
      });
    }
    this.isBeforeMount = false;
    if (instance.m)
      delay(() =>
        delay(() => {
          instance.m();
          this.isMounted = true;
        })
      );
  }

  // unmount 全 DOM Tree
  removeFullTree(instance = this) {
    if (instance.bd) instance.bd();
    this.isBeforeDestroy = true;
    if (instance.children.length !== 0) {
      instance.children.forEach((el) => {
        el.element.remove();
        if (el.stylesheet) document.head.removeChild(el.stylesheet);
        if (el.children.length !== 0) el.removeFullTree();
      });
    }
    instance.element.remove();
    if (instance.stylesheet) document.head.removeChild(instance.stylesheet);
    this.isSetup = false;
    this.isMounted = false;
    this.isBeforeDestroy = false;
    if (instance.d) instance.d();
    this.isDestroyed = true;
  }

  // 監聽變動資料
  ref = (ref) =>
    /** observer 函式
     * @param {Proxy} target 目標 ref。
     * @param {string} prop 目標 ref 屬性。
     * @param {any} value 目標 ref 值。
     **/
    reactive(ref, (target, prop, value) => {
      updateDOM(this.children);
    });

  // 連結 CSS
  linkCSS(href) {
    this.stylesheet = document.createElement("link");
    this.stylesheet.href = reDirectUrl(href);
    this.stylesheet.rel = "stylesheet";
    return this;
  }

  useRouter(router) {
    this.router = router;
    return this;
  }

  replace(oldChild) {
    oldChild.removeFullTree();
    root.appendChild(this.element);
  }

  setup(func = () => {}) {
    this.s = () => {
      if (this.isSetup) return;
      func();
    };
  }

  beforeMount(func = () => {}) {
    this.bm = () => {
      if (this.isBeforeMount) return;
      func();
    };
  }

  mounted(func = () => {}) {
    this.m = () => {
      if (this.isMounted) return;
      func();
    };
  }

  beforeUpdate(func = () => {}) {
    this.bu = () => {
      if (this.isBeforeUpdate) return;
      this.isUpdated = false;
      func();
      this.isBeforeUpdate = true;
    };
  }

  updated(func = () => {}) {
    this.u = () => {
      if (this.isUpdated) return;
      this.isBeforeUpdate = false;
      func();
      this.isUpdated = true;
    };
  }

  beforeDestroy(func = () => {}) {
    this.bd = () => {
      if (this.isBeforeDestroy) return;
      func();
    };
  }

  destroyed(func = () => {}) {
    this.d = () => {
      if (this.isDestroyed) return;
      func();
    };
  }
}
const x_x = new X_X({});

export { x_x };
