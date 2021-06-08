import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { getTokenId } from '../utils/storage';

/**
 * 
 * @param SpecificComponent 
 * @param authority
 *      true: 로그인 유저만 출입 가능
 *      false: 로그인 하지 않은 유저만 출입 가능
 *      null: 출입 제한 없음
 */
const Auth = (SpecificComponent: any, authority: (boolean | null) = null) => {
    const AuthenticationCheck: React.FC = (props: any) => {
        const dispatch = useDispatch();

        const tokenId = getTokenId();

        // const loginCheck = async () => {
        //     const res = await dispatch(auth(tokenId));

        //     if (!res.payload.isLogin) {
        //         // 로그인하지 않은 경우
        //         if (authority) {
        //             props.history.push('/');
        //         }
        //     } else {
        //         // 로그인 한 경우
        //         if (authority === false) {
        //             props.history.push('/editor');
        //         }
        //     }
        // }

        const loginCheck = useCallback(async () => {
            const res = await dispatch(auth(tokenId));

            if (!res.payload.isLogin) {
                // 로그인하지 않은 경우
                if (authority) {
                    props.history.push('/');
                }
            } else {
                // 로그인 한 경우
                if (authority === false) {
                    props.history.push('/editor');
                }
            }
        }, [tokenId, dispatch, props.history]);

        useEffect(() => {
            loginCheck();
        }, [loginCheck]);

        return <SpecificComponent />;
    }

    return AuthenticationCheck;
}

export default Auth;