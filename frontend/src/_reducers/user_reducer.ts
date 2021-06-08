import {
    LOGIN_USER,
    LOGOUT_USER,
    AUTH_USER
} from '../_actions/types';

interface iAction {
    type: string,
    payload?: any
}

const userState = (state: any = {}, action: iAction) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, login: action.payload };
        case AUTH_USER:
            return { ...state, auth: action.payload };
        case LOGOUT_USER:
            return { ...state, logout: action.payload };
        default:
            return state;
    }
}

export default userState;