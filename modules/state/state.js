const updateState = (o, c, n) => {
  o = c;
  c = n;
};

function useState(val) {
  let state = null;
  const set = (newVal) => {
    if (!Object.is(state, newVal)) {
      state = newVal;
    }
    console.log({ state, newVal });
  };
  set(val);
  return [state, set];
}
export { useState };
