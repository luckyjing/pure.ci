import request from 'request-promise'
import Response from './response'
import {
  coding
} from '../config/config'
export default async(ctx, next) => {
  let query = ctx.query;
  if (!query || !query.code) {
    return ctx.body = new Response(300, 'code is not defined');
  }
  let options = {
    uri: `https://coding.net/api/oauth/access_token?client_id=${coding.clientId}&client_secret=${coding.clientSecret}&grant_type=authorization_code&code=${query.code}`,
    json: true
  };
  let res = await request(options);
  let opt2 = {
    uri: `https://coding.net/api/user/projects?access_token=${res.access_token}`,
    json: true
  };
  let res2 = await request(opt2);
  ctx.body = new Response(200, res2);
}

// https://coding.net/oauth_authorize.html?client_id=eb1f4fffdad9ebae384f83e1de7ba4d7&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fcoding&response_type=code&scope=user%2Cuser%3Aemail%2Cnotification%2Cproject%2Cproject%3Adepot%2Cproject%3Akey

// https://coding.net/oauth_authorize.html?client_id=ff404fd47912cbf92993437c2ac3456c&redirect_uri=https%3A%2F%2Fci.daocloud.io%2Fapi%2Ftokens%2Fcallbackhandler%2Fcoding.net&response_type=code&scope=user%2Cuser%3Aemail%2Cnotification%2Cproject%2Cproject%3Adepot%2Cproject%3Akey&state=96ac604f-c281-4ebe-a2b1-e60495dcad95