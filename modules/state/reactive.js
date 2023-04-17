import updateDOM from "./updateDOM.js";

function reactive(obj = {}, onChange = () => {}) {
  if (obj.value) throw new TypeError("'value' is the reserve word of ref.");
  let ref = obj;
  if (!(obj instanceof Object)) {
    ref = { value: obj };
  }
  ref._isProxy = true;
  return new Proxy(ref, {
    get(target, prop) {
      // console.log(receiver)
      if (typeof target[prop] === "object" && target[prop] !== null) {
        return reactive(target[prop], onChange);
      }
      return target[prop];
    },
    set(target, prop, value) {
      if (target[prop].__proto__ === value.__proto__) {
        target[prop] = value;
        onChange(target, prop, value);
        return true;
      } else {
        throw new Error("New value must be the same type of old value.");
      }
    },
  });
}

export { reactive, updateDOM };
