import axios from 'axios';

const userKey='5f67628d38ce870016398584';
export default axios.create({
  baseURL: `https://${userKey}.mockapi.io/`,
});