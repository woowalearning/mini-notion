import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { googleApiKey } from '../../api/key';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { getTokenId } from '../../utils/storage';

const Editor: React.FC = (props: any) => {
    const dispatch = useDispatch();

    const googleLogoutSuccess = async () => {
        const tokenId = getTokenId();

        const res = await dispatch(logoutUser(tokenId));

        if (!res.payload.success) {
            googleLogoutFailure();
        } else {
            props.history.push('/');
        }
    }

    const googleLogoutFailure = () => {
        alert('로그아웃에 실패했습니다.');
    }

    return (
        <div>
            <GoogleLogout
                clientId={googleApiKey}
                onLogoutSuccess={googleLogoutSuccess}
                onFailure={googleLogoutFailure}
            />
        </div>
    )
}

export default withRouter(Editor);