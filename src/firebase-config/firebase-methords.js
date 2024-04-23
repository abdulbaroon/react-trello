import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase';

export const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);

export const signInUser = async (
  email,
  password
) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUpUser = async (
  email,
  password
) => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

export const GoogleAuth = async () => {
  return await signInWithPopup(auth, GoogleProvider);
};

export const GithubAuth = async () => {
  return await signInWithPopup(auth, GithubProvider);
};

export const ResetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

export const confirmThePasswordReset = async (
  oobCode,
  newPassword
) => {
  if (!oobCode && !newPassword) return;

  return await confirmPasswordReset(auth, oobCode, newPassword);
};

export const userStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const SignOutUser = async () => {
  return await signOut(auth);
};

