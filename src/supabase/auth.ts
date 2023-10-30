// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// import { supabase } from '~supabase/supabase';

// export const googleSignIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();

//     const userInfo = await GoogleSignin.signIn();
//     if (userInfo.idToken) {
//       const { data, error } = await supabase.auth.signInWithIdToken({
//         provider: 'google',
//         token: userInfo.idToken,
//       });
//       console.log(error, data);
//     } else {
//       throw new Error('no ID token present!');
//     }
//   } catch (error: unknown) {
//     // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//     //   // user cancelled the login flow
//     // } else if (error.code === statusCodes.IN_PROGRESS) {
//     //   // operation (e.g. sign in) is in progress already
//     // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//     //   // play services not available or outdated
//     // } else {
//     //   // some other error happened
//     // }
//   }
// };
