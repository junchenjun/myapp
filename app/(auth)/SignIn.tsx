import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { Link } from 'expo-router';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import ThemedText from '../../components/ThemedText';
import { auth } from '../../firebaseConfig';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { Theme } from '../../redux/themeSlice';
import { RootState } from '../_layout';

export default function SignIn() {
  const styles = useThemedStyles(createStyles);

  const user = useSelector((state: RootState) => state.auth);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      // Build Firebase credential with the Google ID token.
      const idToken = response.idToken;
      const credential = GoogleAuthProvider.credential(idToken);

      // Sign in with credential from the Google user.
      signInWithCredential(auth, credential)
        .then((v) => {})
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The credential that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log('signInWithCredential error', errorCode, errorMessage, email, credential);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ThemedText text="Sign In" size="heading2" />
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          disabled={false}
        />
      </View>
    </View>
  );
}

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 24,
      backgroundColor: theme.color.surface300,
    },
    main: {
      flex: 1,
      justifyContent: 'center',
      maxWidth: 960,
      marginHorizontal: 'auto',
    },
    title: {
      fontSize: 64,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 36,
      color: '#38434D',
    },
  });
  return styles;
};
