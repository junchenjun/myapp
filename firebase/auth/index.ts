import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAdditionalUserInfo, signInWithCredential } from 'firebase/auth';

import { auth } from '../firebaseConfig';
import { createSamplePlan } from '../plans';

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    // Build Firebase credential with the Google ID token.
    const idToken = response.idToken;
    const credential = GoogleAuthProvider.credential(idToken);

    // Sign in with credential from the Google user.
    signInWithCredential(auth, credential)
      .then((v) => {
        const userInfo = getAdditionalUserInfo(v);
        return { ...userInfo, ...v };
      })
      .then((info) => {
        const isNewUser = info.isNewUser;
        if (isNewUser) {
          createSamplePlan(info.user.uid);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The credential that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  } catch (error) {
    // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //   // user cancelled the login flow
    // } else if (error.code === statusCodes.IN_PROGRESS) {
    //   // operation (e.g. sign in) is in progress already
    // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //   // play services not available or outdated
    // } else {
    //   // some other error happened
    // }
  }
};
