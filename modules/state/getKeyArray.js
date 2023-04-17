const getKeyArray = (obj, arr) => {
  for (let key in obj) {
    if (obj[key] instanceof Object && key !== "x_model") {
      if ("_isProxy" in obj[key] && !arr.some((val) => val.key === key)) {
        arr.push({ key, value: obj[key] });
      } else {
        getKeyArray(obj[key], arr);
      }
    }
  }
};
export default getKeyArray;
