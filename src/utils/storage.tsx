const PREFERENCES = `chatbox-sotatek`;

interface Authentication {
  accessToken?: string;
  expireTime?: number;
}

const defaultAuthentication: Authentication = {
  accessToken: '',
};

type storageInterface = Authentication; // A | B | C

function getStorage(type: string): storageInterface {
  switch (type) {
    case PREFERENCES:
      const preferencesString = localStorage.getItem(PREFERENCES);
      const preferences = JSON.parse(preferencesString || '{}');
      return {
        ...defaultAuthentication,
        ...preferences,
      };
    default:
      return defaultAuthentication;
  }
}

function setStorage(type: string, value: storageInterface) {
  switch (type) {
    case PREFERENCES:
      localStorage.setItem(type, JSON.stringify(value));
      break;
    default:
      break;
  }
}

class Storage {
  static init() {
    const preferences = getStorage(PREFERENCES);
    setStorage(PREFERENCES, preferences);
  }

  static getAccessToken(): string | undefined {
    const { accessToken } = getStorage(PREFERENCES);
    return accessToken;
  }

  static getExpireTimeToken(): number | undefined {
    const { expireTime } = getStorage(PREFERENCES);
    return expireTime;
  }

  static setAccessToken(accessToken: string, expireTime: number) {
    const preferences = getStorage(PREFERENCES);
    preferences.accessToken = accessToken;
    preferences.expireTime = expireTime;
    setStorage(PREFERENCES, preferences);
  }

  static clearAccessToken() {
    const preferences = getStorage(PREFERENCES);
    delete preferences.accessToken;
    delete preferences.expireTime;
    setStorage(PREFERENCES, preferences);
  }
}

export default Storage;
