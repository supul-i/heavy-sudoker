const throttle = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  let timer: number | null = null;

  return (...args: T) => {
    if (!timer) {
      timer = window.setTimeout(() => {
        timer = null;
        callback(...args);
      }, delay);
    }
  };
};

export default throttle;
