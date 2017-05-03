// 传入一个时间戳，返回距离目前的时间差
export function fromNow(time) {
  return moment(parseInt(time)).fromNow();
}
// 表单有错误
export function hasErrors(fieldsError) {
  return Object
    .keys(fieldsError)
    .some(field => fieldsError[field]);
}