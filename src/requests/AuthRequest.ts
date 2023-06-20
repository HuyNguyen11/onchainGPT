import BaseRequest from './BaseRequest';
import config from 'src/config';

const googleRedirectUri = `${window.location.origin}/google/callback`;

export default class AuthRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  getLoginGoogle() {
    const url = `/api/auth/google/url/`;
    return this.get(url, {
      redirect_uri: googleRedirectUri,
    });
  }
  getLoginAccessToken(payload: { code: string }) {
    const url = `/api/auth/google/login/`;
    return this.post(url, {
      redirect_uri: googleRedirectUri,
      ...payload,
    });
  }
  getUser() {
    const url = `/api/auth/me`;
    return this.get(url);
  }
}
