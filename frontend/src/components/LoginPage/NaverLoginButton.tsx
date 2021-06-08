import React, {useEffect} from 'react';

const {naver} = window as any;

const NaverLoginButton: React.FC = (props: any) => {
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: 'bFYiCuz1OTwiPsSA7c7z',
            callbackUrl: 'http://localhost:3000/naver-login',
            isPopup: true,
            loginButton: {color: 'green', type: 3, height: '43'}
        });
        naverLogin.init();
    }

    useEffect(() => {
        initializeNaverLogin();
    }, []);

    return (
        <div id="naverIdLogin" />
    );
}

export default NaverLoginButton;