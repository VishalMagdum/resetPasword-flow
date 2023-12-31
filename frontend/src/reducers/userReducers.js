import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,

    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,

    LOGOUT_FAIL,
    LOGOUT_SUCCESS,

    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,

    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    CLEAR_ERRORS,
} from '../constants/userConstants'


export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                success: true,
                user: null,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }

        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                success: false,
                error: action.payload,
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,


            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;

    }

}


export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:

            return {
                ...state,
                loading: true,
                error: null,
            };
        case FORGOT_PASSWORD_SUCCESS:

            return {
                ...state,
                loading: false,
                message: action.payload,
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };

        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };



        case CLEAR_ERRORS:
            return {
                ...state,
                message: null,
                error: null,
            };

        default:
            return state
    }
}