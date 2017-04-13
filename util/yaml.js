import yaml from 'js-yaml'

export function toJs(text){
  return yaml.safeLoad(text);
}
export function toYaml(content){
  return yaml.safeDump(content,{
  'styles': {
    '!!null': 'canonical' // dump null as ~
  },
  'sortKeys': false        // sort object keys
})
}