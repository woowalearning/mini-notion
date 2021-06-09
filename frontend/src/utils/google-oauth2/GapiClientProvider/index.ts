import loadGapiScript from './utils';

export default class GapiClientProvider {
  clientConfig: Parameters<typeof gapi.auth2.init>[0]

  client: {
    gapi: typeof gapi,
    authInstance: gapi.auth2.GoogleAuth
  } | null

  promise: Promise<{
      gapi: typeof gapi;
      authInstance: gapi.auth2.GoogleAuth;
  }> | null

  constructor(clientConfig: Parameters<typeof gapi.auth2.init>[0]) {
    this.clientConfig = JSON.parse(JSON.stringify(clientConfig));
    this.promise = null;
    this.client = null;
  }

  getClientConfig() {
    return this.clientConfig;
  }

  getClient() {
    if (this.client !== null) {
      return Promise.resolve(this.client);
    }

    if (this.promise === null) {
      this.promise = loadGapiScript().then((gapi) => new Promise((resolve, reject) => {
        gapi.load('client:auth2', () => {
          gapi.client.init(this.clientConfig).then(() => {
            this.client = {
              gapi,
              authInstance: gapi.auth2.getAuthInstance(),
            };
            resolve(this.client);
          }, reject);
        });
      }));
    }

    return this.promise;
  }
}
