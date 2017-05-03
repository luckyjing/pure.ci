export const JobStatus = {
  '-1': {
    text: '执行失败',
    class: 'text-error',
    bgClass:'bg-error'
  },
  '0': {
    text: '尚未开始',
    class: '',
    bgClass:'bg-muted'
  },
  '1': {
    text: '进行中',
    class: 'text-warning',
    bgClass:'bg-warning'
  },
  '2': {
    text: '执行成功',
    class: 'text-success',
    bgClass:'bg-success'
  }
}