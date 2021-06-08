import React from 'react';
import useGapiService from './utils/google-oauth2';

export default function App() {
  const gapiService = useGapiService();
  return (
    <>
      <button
        type="button"
        onClick={async () => {
          const client = await gapiService.current.getGapiClient();
          const GoogleAuth = client.auth2.getAuthInstance();

          try {
            const res = await GoogleAuth.signIn();
            console.log(res);
            // http.defaults.headers.Authorization = `Bearer ${res.getAuthResponse().access_token}`;
            window.sessionStorage.setItem('access_token', res.getAuthResponse().access_token);
            window.sessionStorage.setItem('id_token', res.getAuthResponse().id_token);
            window.sessionStorage.setItem('name', res.getBasicProfile().getName());
            window.sessionStorage.setItem('login_hint', res.getAuthResponse().login_hint);
            window.sessionStorage.setItem('scope', res.getAuthResponse().scope);
            window.sessionStorage.setItem('expires_in', res.getAuthResponse().expires_in.toString());
            window.sessionStorage.setItem('first_issued_at', res.getAuthResponse().first_issued_at.toString());
            window.sessionStorage.setItem('expires_at', res.getAuthResponse().expires_at.toString());
            // const { redirectURL } = router.query as { redirectURL: string };
            // router.push(redirectURL ?? '/form');
          } catch (err) {
            console.log(err);
          }
        }}
      >
        로그인
      </button>
      <h1>woowahan learning</h1>
    </>
  );
}
