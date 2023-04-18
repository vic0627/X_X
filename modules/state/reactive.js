import updateDOM from "./updateDOM.js";

function reactive(obj = {}, onChange = () => {}) {
  if (obj.value || obj._isProxy)
    throw new TypeError("'value' is the reserve word of ref.");
  const ref = { value: obj };
  Object.defineProperty(ref, "_isProxy", {
    value: true,
    writable: false,
  });
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
