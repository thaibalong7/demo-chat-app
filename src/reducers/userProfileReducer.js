import { LOGIN_USER, LOGOUT_USER } from '../actions/types'

const initialState = {

}

const userProfileReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            const { user_info } = action;
            return user_info;
        }
        case LOGOUT_USER:{
            return {};
        }
        default:
            return prevState;
    }

}
export default userProfileReducer;