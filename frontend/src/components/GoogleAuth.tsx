import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

type GoogleLoginButtonProps = {
  isLogout?: boolean;
  onLogoutSuccess?: () => void;
  onLogoutFailure?: () => void;
  onLoginSuccess?: (response: any) => void;
  onLoginFailure?: (error: any) => void;
};

const defaultProps:GoogleLoginButtonProps = {
  isLogout: false,
  onLogoutSuccess: () => {},
  onLogoutFailure: () => {},
  onLoginSuccess: () => {},
  onLoginFailure: () => {},
};

function GoogleAuth({
  isLogout, onLogoutSuccess, onLogoutFailure, onLoginSuccess, onLoginFailure,
}:GoogleLoginButtonProps) {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
  return isLogout
    ? (
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={onLogoutSuccess}
        onFailure={onLogoutFailure}
      />
    )
    : (
      <GoogleLogin
        clientId={clientId}
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
      />
    );
}

GoogleAuth.defaultProps = defaultProps;

export default GoogleAuth;
