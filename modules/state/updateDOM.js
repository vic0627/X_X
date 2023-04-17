import getKeyArray from "./getKeyArray.js";

const updateDOM = (children = []) => {
  // 從 root 的 children 開始遍歷。
  children.forEach((el) => {
    // 取得須監聽的對象 { 要更新的 DOM, 相對應的 ref }。
    getKeyArray(el.vNode, el.needObserved);
    // 觀察對象大於0，更新 DOM。
    if (el.needObserved.length > 0)
      el.needObserved.forEach((ob) => {
        const id = el.compareObserved.findIndex((obj) => obj.key === ob.key);
        // 若值未改變，返回。
        if (el.compareObserved[id].value === ob.value.value) return;
        if (ob.key === "innerText") {
          el.element[ob.key] = ob.value.value;
        } else if (!ob.value.value) {
          el.element.removeAttribute(ob.key);
        } else {
          el.element.setAttribute(ob.key, ob.value.value);
        }
        el.compareObserved[id].value = ob.value.value;
      });
    // 若有子節點，開始遞迴。
    if (el.children.length > 0) updateDOM(el.children);
  });
};
export default updateDOM;
