import React, { useState } from 'react';
import GoogleAuth from './components/GoogleAuth';

type User = {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
}

export default function App() {
  const [user, setUser] = useState<User|null>(null);

  return (
    <>
      <h1>woowahan learning</h1>
      <div>
        {
          !user
            ? (
              <GoogleAuth
                onLoginSuccess={(response) => setUser(response.profileObj)}
                onLoginFailure={console.log}
              />
            )
            : (
              <>
                <p>
                  {`${user.name} ${user.email}`}
                </p>
                <GoogleAuth isLogout onLogoutSuccess={() => setUser(null)} />
              </>
            )
        }
      </div>
    </>
  );
}
