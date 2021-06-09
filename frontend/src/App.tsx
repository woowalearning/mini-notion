import React, { useEffect, useState } from 'react';
// import useGapiService from 'utils/google-oauth2';
import CustomEditor from './components/CustomEditor';
import GapiOAuth2Button from './components/GapiOAuth2Button';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const t = location.search.match(/^(?=\?token=)/);
    if (t) {
      console.log(t.values);
      setIsSignedIn(true);
      // GapiProvider부터가 작동을...?
      // window.sessionStorage.setItem('access_token', res.getAuthResponse().access_token);
      // window.sessionStorage.setItem('id_token', res.getAuthResponse().id_token);
      // window.sessionStorage.setItem('name', res.getBasicProfile().getName());
      // window.sessionStorage.setItem('login_hint', res.getAuthResponse().login_hint);
      // window.sessionStorage.setItem('scope', res.getAuthResponse().scope);
      // window.sessionStorage.setItem('expires_in', res.getAuthResponse().expires_in.toString());
      // window.sessionStorage.setItem('first_issued_at', res.getAuthResponse().first_issued_at.toString());
      // window.sessionStorage.setItem('expires_at', res.getAuthResponse().expires_at.toString());
    }
  }, []);

  return (
    <>
      {isSignedIn ? '로그인 후' : <GapiOAuth2Button>로그인</GapiOAuth2Button>}
      <h1>woowahan learning</h1>
      <CustomEditor />
    </>
  );
}
