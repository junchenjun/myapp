import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { IconApple, IconGoogle } from '~assets/icons';
import { Button } from '~components/button/Button';
import { Text } from '~components/text/Text';
import { firebaseAuth } from '~firebase/firebaseConfig';
import { getFloatButtonDistance } from '~utils/styleHelper';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '878529743045-prlrevc1bfonrg7k4lfgvg9m0fuqtqon.apps.googleusercontent.com',
  iosClientId: '878529743045-2vgcb7o636p3pvhdjvjpvnq8vb8g5l7p.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  googleServicePlistPath: '../../GoogleService-Info.plist',
});

export default function SignIn() {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const googleSignIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = firebaseAuth.GoogleAuthProvider.credential(idToken);
      firebaseAuth()
        .signInWithCredential(googleCredential)
        .then(info => {
          const isNewUser = info.additionalUserInfo?.isNewUser;
          if (isNewUser) {
            // await createSamplePlan(info.user.uid);
          }
          router.replace('(home)');
        })
        .catch(() => {
          setLoading(false);
          // // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // // The email of the user's account used.
          // const email = error.email;
          // // The credential that was used.
        });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text text='Sign In' size='heading1' />
      </View>
      <Button
        leftComponent={<IconGoogle height={18} width={18} fill={styles.icon.color} />}
        loading={loading}
        title='Sign in with Google'
        onPress={googleSignIn}
      />
      <Button
        leftComponent={<IconApple height={22} width={22} fill={styles.icon.color} />}
        loading={loading}
        title='Sign in with Apple'
        onPress={() => null}
      />
    </View>
  );
}

const createStyles = (theme: ITheme, insets: EdgeInsets) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      padding: 24,
      gap: 15,
      backgroundColor: theme.colors.surface100,
      paddingBottom: getFloatButtonDistance(insets) + 50,
    },
    header: {
      marginBottom: 10,
    },
    icon: {
      color: theme.colors.textOnPrimary,
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
