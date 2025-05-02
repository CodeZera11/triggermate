import axios from 'axios';
import { serverEnv } from './server-env';

export const refreshToken = async (token: string) => {
  const refresh_token = await axios.get(`${serverEnv.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`)

  return refresh_token.data;
}