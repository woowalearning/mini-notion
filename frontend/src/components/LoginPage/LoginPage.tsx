import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import NaverLoginButton from './NaverLoginButton';

const LoginPage: React.FC = (props: any) => {
    return (
        <div>
            <GoogleLoginButton />
            <NaverLoginButton />
        </div>
    )
}

export default LoginPage;