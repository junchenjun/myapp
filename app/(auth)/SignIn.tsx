import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { StyleSheet, View } from 'react-native';

import ThemedText from '../../components/element/ThemedText';
import { googleSignIn } from '../../firebase/auth';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { Theme } from '../../redux/themeSlice';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '244734442198-d4mo1hj0a21q2887672csn2s23j5evd9.apps.googleusercontent.com',
  iosClientId: '244734442198-spvdk7vrtvn6huohnqb89cs4mgpd9c80.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  googleServicePlistPath: '../../GoogleService-Info.plist',
});

export default function SignIn() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ThemedText text="Sign In" size="heading2" />
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn}
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
      backgroundColor: theme.color.surface200,
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
