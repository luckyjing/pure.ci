import {post, get, del} from '../utils/request';

const Prefix = PURE_CI_CONFIG.API_PREFIX;

export async function getUser() {
  return get(`${Prefix}/user`);
}