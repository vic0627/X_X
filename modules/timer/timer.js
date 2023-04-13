const delay = (callback, delay = 10) => {
  const timer = setTimeout(() => {
    callback();
    clearTimeout(timer);
  }, delay);
};
const reCall = (callback, freq = 10) => {
  const timer = setInterval(() => {
    callback(timer);
  }, freq);
  return timer;
};
export { delay, reCall };
