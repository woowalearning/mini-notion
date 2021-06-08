export const SESSION_STORAGE_KEY = 'gapi.session';

export default class SessionStorage {
  sessionStorage: Storage

  constructor(sessionStorage?: Storage) {
    if (typeof window !== 'undefined') {
      if (sessionStorage === undefined) {
        sessionStorage = window.sessionStorage;
      }
    }
    this.sessionStorage = sessionStorage as Storage;
  }

  set(session: Object) {
    this.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  setItem(key: string, value: string) {
    const session = this.get() || {};
    session[key] = value;
    this.set(session);
  }

  get() {
    return JSON.parse(this.sessionStorage.getItem(SESSION_STORAGE_KEY) as string);
  }

  getItem(key: string) {
    const session = this.get() || {};

    return session[key];
  }

  clear() {
    this.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }
}
