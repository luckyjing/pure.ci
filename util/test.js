/**
 * 数组所有项不能为空
 * @param {*} array
 */
export function notNull(array) {
  let flag = true;
  array.forEach(item => {
    if (!item) {
      flag = false;
    }
  });
  return flag;
}