import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { loginUser } from '../../_actions/user_action';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { googleApiKey } from '../../api/key';
import { setTokenId } from '../../utils/storage';
import { History } from 'history';

interface Props {
    history: History;
}

const GoogleLoginButton: React.FC<Props> = (props) => {
    const dispatch = useDispatch();

    const googleLoginSuccess = async (response: (GoogleLoginResponse | GoogleLoginResponseOffline)) => {
        const profile = (response as GoogleLoginResponse).profileObj;
        const tokenId = (response as GoogleLoginResponse).tokenId;
        const body = {
            email: profile.email,
            name: profile.name,
            image: profile.imageUrl
        };
        const res = await dispatch(loginUser(tokenId, body));

        if (!res.payload.success) {
            googleLoginFailure();
        } else {
            setTokenId(tokenId);
            props.history.push('/editor');
        }
    }

    const googleLoginFailure = () => {
        alert('로그인에 실패했습니다.');
    }

    return (
        <GoogleLogin
            clientId={googleApiKey}
            onSuccess={googleLoginSuccess}
            onFailure={googleLoginFailure}
            buttonText="구글 아이디로 로그인"
            cookiePolicy={'single_host_origin'}
            theme="dark"
        />
    );
}

export default withRouter(GoogleLoginButton);
