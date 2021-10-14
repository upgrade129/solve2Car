import { auth, googleAuthProvider, facebookAuthProvider } from '@/api/firebase';

export const signInEmailRequest = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

export const signOutRequest = () => auth.signOut();

export const signInGoogleRequest = () =>
  auth.signInWithPopup(googleAuthProvider);

export const signInFacebookRequest = () =>
  auth.signInWithPopup(facebookAuthProvider);

export const signUpEmailRequest = (email: string, password: string) =>
  auth.createUserWithEmailAndPassword(email, password);
