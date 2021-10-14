import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import firebase from 'firebase';

// Constants
import {
  AUTH_TOKEN,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_FACEBOOK,
} from '@/redux/constants/auth';

// Redux Actions
import {
  showAuthMessage,
  authenticated,
  signOutSuccess,
  signUpSuccess,
  signInWithGoogleAuthenticated,
  signInWithFacebookAuthenticated,
} from '@/redux/actions/auth';

import * as FirebaseService from '@/services/FirebaseService';

export function* signInWithEmail() {
  yield takeEvery(SIGNIN, function* ({ payload }: any) {
    const { email, password } = payload;
    try {
      const data: firebase.auth.UserCredential = yield call(
        FirebaseService.signInEmailRequest,
        email,
        password,
      );
      localStorage.setItem(AUTH_TOKEN, data.user?.uid as string);
      if (data.user) {
        yield put(authenticated(data.user.uid));
      }
    } catch (err) {
      yield put(showAuthMessage(err));
    }
  });
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
    try {
      yield call(FirebaseService.signOutRequest);
      localStorage.removeItem(AUTH_TOKEN);
      yield put(signOutSuccess());
    } catch (err) {
      yield put(showAuthMessage(err));
    }
  });
}

export function* signUpWithEmail() {
  yield takeEvery(SIGNUP, function* ({ payload }: any) {
    const { email, password } = payload;
    try {
      const data: firebase.auth.UserCredential = yield call(
        FirebaseService.signUpEmailRequest,
        email,
        password,
      );
      localStorage.setItem(AUTH_TOKEN, data.user?.uid as string);
      if (data.user) {
        yield put(signUpSuccess(data.user.uid));
      }
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export function* signInWithFBGoogle() {
  yield takeEvery(SIGNIN_WITH_GOOGLE, function* () {
    try {
      const data: firebase.auth.UserCredential = yield call(
        FirebaseService.signInGoogleRequest,
      );
      localStorage.setItem(AUTH_TOKEN, data.user?.uid as string);
      if (data.user) {
        yield put(signInWithGoogleAuthenticated(data.user.uid));
      }
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export function* signInWithFacebook() {
  yield takeEvery(SIGNIN_WITH_FACEBOOK, function* () {
    try {
      const data: firebase.auth.UserCredential = yield call(
        FirebaseService.signInFacebookRequest,
      );
      localStorage.setItem(AUTH_TOKEN, data.user?.uid as string);
      if (data.user) {
        yield put(signInWithFacebookAuthenticated(data.user.uid));
      }
    } catch (error) {
      yield put(showAuthMessage(error));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(signInWithEmail),
    fork(signOut),
    fork(signUpWithEmail),
    fork(signInWithFBGoogle),
    fork(signInWithFacebook),
  ]);
}
