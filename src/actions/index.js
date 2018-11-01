import {
    LOGIN_USER, LOGOUT_USER
} from './types'

export const login_user = (user_info) => {
    return {
        type: LOGIN_USER,
        user_info
    }
}
export const logout_user = (user_info) => {
    return {
        type: LOGOUT_USER,
        user_info
    }
}