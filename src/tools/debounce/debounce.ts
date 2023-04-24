/** 防抖函数
 * @param func 回调函数
 * @param wait 延迟时间
 * @param immediate 是否立即执行
 */
export const debounce = <A extends Array<any>, R = void>(
  func: (...args: A) => R,
  wait: number,
  immediate: boolean = false
) => {
  let timeout: any, result: any;
  const debounced = function (this: any, ...args: A) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}
