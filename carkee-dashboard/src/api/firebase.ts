import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Configs
import firebaseConfig from '@/configs/firebase';

firebase.initializeApp(firebaseConfig);

// Firebase Utils
export const db = firebase.firestore();
export const auth = firebase.auth();
export const currentUser = auth.currentUser;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
