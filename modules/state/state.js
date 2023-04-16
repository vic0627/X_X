function reactive(obj = {}, onChange = () => {}) {
  if (obj.value) throw new TypeError("'value' is the reserve word of ref.");
  let ref = obj;
  if (!(obj instanceof Object)) {
    ref = { value: obj };
  }
  ref._isProxy = true;
  // console.log(this);
  return new Proxy(ref, {
    get(target, prop, receiver) {
      // console.log(receiver)
      if (typeof target[prop] === "object" && target[prop] !== null) {
        return reactive(target[prop], onChange);
      }
      return target[prop];
    },
    set(target, prop, value) {
      if (target[prop].__proto__ === value.__proto__) {
        target[prop] = value;
        onChange(prop, value);
        return true;
      } else {
        throw new Error("87878787");
      }
    },
  });
}

class observer {
  constructor(element, reactiveData) {
    this.element = element;
    this.reactiveData = reactiveData;
    this.reactiveData.subscribe(this);
    this.update(this.reactiveData.value);
  }

  // 更新元素的内容
  update(newValue) {
    this.element.innerHTML = newValue;
  }

  // 取消观察
  unobserve() {
    this.reactiveData.unsubscribe(this);
  }
}
export { reactive };
