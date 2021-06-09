import React from 'react';

const GapiOAuth2Button: React.FC = ({ children }) => {
  const path = 'https://accounts.google.com/o/oauth2/v2/auth?';
  const query = `scope=${JSON.parse(process.env.GOOGLE_SCOPE ?? '[]').join(' ')}&`
    + 'access_type=offline&'
    + 'include_granted_scopes=true&'
    + 'state=state_parameter_passthrough_value&'
    + `redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&`
    + 'response_type=code&'
    + `client_id=${process.env.GOOGLE_CLIENT_ID}`;

  const href = path + query;
  return (
    <a href={href}>
      {children}
    </a>
  );
};

export default GapiOAuth2Button;
