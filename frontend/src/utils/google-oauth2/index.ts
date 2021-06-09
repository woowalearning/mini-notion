import { useRef } from 'react';
import GapiClientProvider from './GapiClientProvider';
import GoogleAuthService from './GoogleAuthService';
import SessionStorage from './SessionStorage';

/**
 * <code>gapi.client.init</code> configuration parameters.
 *
 * @typedef {object} Options
 * @static
 * @see [gapi.client.init]{@link https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--}
 *
 * @property {string} [apiKey] The API Key to use
 * @property {string[]} [discoveryDocs] An array of discovery doc URLs or discovery doc JSON objects
 * @property {string} [clientId]
 * The app's client ID, found and created in the Google Developers Console
 * @property {string} [scope] The scopes to request, as a space-delimited string
 */

const clientProvider = new GapiClientProvider({
  client_id: process.env.GOOGLE_CLIENT_ID,
  scope: JSON.parse(process.env.GOOGLE_SCOPE ?? '[]').join(' '),
  redirect_uri: process.env.GOOGLE_REDIRECT_URL,
  // ux_mode: 'redirect', // redirect 하면 hashbang url로... 원인은 아직 모름.
});
const sessionStorage = new SessionStorage();
const service = new GoogleAuthService(clientProvider, sessionStorage);

export default function useGapiService() {
  const value = useRef(service);
  return value;
}

const version = '__VERSION__';

export { version };
