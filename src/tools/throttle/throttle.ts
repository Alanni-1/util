/**
 * 节流函数
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param options 配置项
 * @returns 返回客户调用函数
 */
export const throttle = <A extends Array<any>, R = void>(
  func: (...args: A) => R,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) => {
  
}
