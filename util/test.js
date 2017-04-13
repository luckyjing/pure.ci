/**
 * 数组所有项不能为空
 * @param {*} array 
 */
export function notNull(array) {
  return array.every(item => {
    item != null || item != undefined
  });
}