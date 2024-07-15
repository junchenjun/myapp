import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Icon } from '~components/atoms/icon/Icon';
import { firebaseAuth } from '~firebase/firebaseConfig';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '878529743045-prlrevc1bfonrg7k4lfgvg9m0fuqtqon.apps.googleusercontent.com',
  iosClientId: '878529743045-75atqbf09t8id612juvjudp43ts3fn7u.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

export default function Auth() {
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(createStyles(insets));
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
        <Icon icon={icons.Logo} size={250} fill='primary' />
      </View>
      <View style={styles.buttons}>
        <Button
          variant='primary'
          icon={icons.Google}
          loading={loading}
          title='Sign in with Google'
          onPress={googleSignIn}
          alignment='stretch'
        />
        <Button
          variant='primary'
          alignment='stretch'
          icon={icons.Apple}
          loading={loading}
          title='Sign in with Apple'
          onPress={() => null}
          disabled
        />
      </View>
    </View>
  );
}

const createStyles = (insets: EdgeInsets) => (theme: ITheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.surfaceExtraBright,
    },
    buttons: {
      width: '100%',
      padding: theme.spacing[6],
      gap: theme.spacing[3],
      backgroundColor: theme.colors.surfaceDim,
      paddingBottom: theme.spacing[6] + insets.bottom,
      paddingTop: theme.spacing[6],
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
    },
    header: {
      justifyContent: 'center',
      flex: 1,
      alignSelf: 'center',
    },
    icon: {
      color: theme.colors.onSurfaceDim,
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
