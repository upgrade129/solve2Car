// Types
import { Action, AuthReducer } from '@/types/redux';

// Redux Constants
import {
  SIGNIN,
  AUTHENTICATED,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
  SIGNIN_MANUAL,
  AUTH_TOKEN,
  SET_USER,
} from '@/redux/constants/auth';

import axios from 'axios';
import { setHeader } from '@/utils/custom-axios';

export const signInManual = (user: any) => async (dispatch: any) => {
  const { email, password } = user;

  try {
    const response = await axios.post(`/api/user/login`, {
      email,
      password,
      account_id: 1,
    });
    const { token } = response.data;
    localStorage.setItem(AUTH_TOKEN, token);
    dispatch({ type: SIGNIN_MANUAL, payload: token });
  } catch (e) {
    console.log(
      `Error in POST route /api/auth/login: ${e.response.data.message}`,
    );
    localStorage.removeItem(AUTH_TOKEN);

    dispatch(
      showAuthMessage(
        e.response.data.message ? e.response.data.message : 'Fail login',
      ),
    );
  }
};

export const getUser = () => async (dispatch: any) => {
  const currentToken = localStorage.getItem(AUTH_TOKEN);
  setHeader(currentToken);
  try {
    const response = await axios.get(`/api/user/info`);
    const { data } = response.data;
    dispatch({ type: SET_USER, payload: data });

    setHeader(localStorage.getItem(AUTH_TOKEN));
  } catch (err) {
    if (err.response) {
      dispatch({
        type: SIGNOUT,
      });
      dispatch({
        type: SHOW_AUTH_MESSAGE,
        message: err.response.data.errors
          ? err.response.data.errors
          : 'Fail to fetch user details',
      });
    }
  }
};

export const logout = (): any => async (dispatch: any) => {
  try {
    dispatch({ type: SIGNOUT });
  } catch (e) {
    console.log(`ERROR in logout route: ${e.message}`);
    dispatch({ type: SIGNOUT });
  }
};

export const signIn = (
  user: AuthReducer['currentUser'],
): Action<AuthReducer['currentUser']> => {
  console.log(90);
  return {
    type: SIGNIN,
    payload: user,
  };
};

export const authenticated = (
  token: AuthReducer['token'],
): Action<AuthReducer['token']> => {
  return {
    type: AUTHENTICATED,
    payload: token,
  };
};

export const signOut = (): Action<undefined> => {
  return {
    type: SIGNOUT,
    payload: undefined,
  };
};

export const signOutSuccess = (): Action<undefined> => {
  return {
    type: SIGNOUT_SUCCESS,
    payload: undefined,
  };
};

export const signUp = (
  user: AuthReducer['currentUser'],
): Action<AuthReducer['currentUser']> => {
  return {
    type: SIGNUP,
    payload: user,
  };
};

export const signUpSuccess = (
  token: AuthReducer['token'],
): Action<AuthReducer['token']> => {
  return {
    type: SIGNUP_SUCCESS,
    payload: token,
  };
};

export const signInWithGoogle = (): Action<undefined> => {
  return {
    type: SIGNIN_WITH_GOOGLE,
    payload: undefined,
  };
};

export const signInWithGoogleAuthenticated = (
  token: AuthReducer['token'],
): Action<AuthReducer['token']> => {
  return {
    type: SIGNIN_WITH_GOOGLE_AUTHENTICATED,
    payload: token,
  };
};

export const signInWithFacebook = (): Action<undefined> => {
  return {
    type: SIGNIN_WITH_FACEBOOK,
    payload: undefined,
  };
};

export const signInWithFacebookAuthenticated = (
  token: AuthReducer['token'],
): Action<AuthReducer['token']> => {
  return {
    type: SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
    payload: token,
  };
};

export const showAuthMessage = (
  message: AuthReducer['message'],
): Action<AuthReducer['message']> => {
  return {
    type: SHOW_AUTH_MESSAGE,
    payload: message,
  };
};

export const hideAuthMessage = (): Action<undefined> => {
  return {
    type: HIDE_AUTH_MESSAGE,
    payload: undefined,
  };
};

export const showLoading = (): Action<undefined> => {
  return {
    type: SHOW_LOADING,
    payload: undefined,
  };
};
