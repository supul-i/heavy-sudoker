function throttle(callback, delay) {
  let timer = null;

  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        callback(...args);
      }, delay);
    }
  };
}

export default throttle;
