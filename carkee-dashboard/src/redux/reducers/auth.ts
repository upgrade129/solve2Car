import update from 'immutability-helper';

// Redux Constants
import {
  AUTH_TOKEN,
  AUTHENTICATED,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SIGNIN_MANUAL,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
  SIGNOUT,
  SET_USER,
} from '@/redux/constants/auth';

// Types
import { Action, AuthReducer } from '@/types/redux';

const initialState: AuthReducer = {
  loading: false,
  message: '',
  showMessage: false,
  redirect: '',
  token: localStorage.getItem(AUTH_TOKEN),
  currentUser: null,
};

const authReducer = (
  state: AuthReducer = initialState,
  action: Action,
): AuthReducer => {
  switch (action.type) {
    case AUTHENTICATED:
      return update(state, {
        loading: {
          $set: false,
        },
        redirect: {
          $set: '/',
        },
        token: {
          $set: (action as Action<AuthReducer['token']>).payload,
        },
      });
    case SHOW_AUTH_MESSAGE:
      return update(state, {
        message: {
          $set: (action as Action<AuthReducer['message']>).payload,
        },
        showMessage: {
          $set: true,
        },
        loading: {
          $set: false,
        },
      });
    case HIDE_AUTH_MESSAGE:
      return update(state, {
        message: {
          $set: '',
        },
        showMessage: {
          $set: false,
        },
      });
    case SET_USER:
      return update(state, {
        redirect: {
          $set: '/',
        },
        loading: {
          $set: false,
        },
        currentUser: {
          $set: (action as Action<AuthReducer['currentUser']>).payload,
        },
      });
    case SIGNOUT:
      localStorage.removeItem(AUTH_TOKEN);
      return update(state, {
        token: {
          $set: null,
        },
        redirect: {
          $set: '/',
        },
        loading: {
          $set: false,
        },
        currentUser: {
          $set: null,
        },
      });
    case SIGNOUT_SUCCESS:
      return update(state, {
        token: {
          $set: null,
        },
        redirect: {
          $set: '/',
        },
        loading: {
          $set: false,
        },
        currentUser: {
          $set: null,
        },
      });
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        token: (action as Action<AuthReducer['token']>).payload,
      };
    case SHOW_LOADING:
      return update(state, {
        loading: {
          $set: true,
        },
      });
    case SIGNIN_MANUAL:
      return update(state, {
        loading: {
          $set: false,
        },
        redirect: {
          $set: '/',
        },
        token: {
          $set: (action as Action<AuthReducer['token']>).payload,
        },
      });
    case SIGNIN_WITH_GOOGLE_AUTHENTICATED:
      return update(state, {
        loading: {
          $set: false,
        },
        token: {
          $set: (action as Action<AuthReducer['token']>).payload,
        },
      });
    case SIGNIN_WITH_FACEBOOK_AUTHENTICATED:
      return update(state, {
        loading: {
          $set: false,
        },
        token: {
          $set: (action as Action<AuthReducer['token']>).payload,
        },
      });
    default:
      return state;
  }
};

export default authReducer;
