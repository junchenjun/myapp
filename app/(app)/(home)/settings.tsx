import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ThemedButton from '../../../components/element/ThemedButton';
import ThemedText from '../../../components/element/ThemedText';
import { auth } from '../../../firebase/firebaseConfig';
import { setTheme } from '../../../redux/themeSlice';
import { RootState } from '../../_layout';

export default function Settings() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      await auth.signOut();
    } catch {}
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.styles.color.surface100 }]}>
      <ThemedText text="settings" />
      <ThemedButton type="secondary" title="Log Out" onPress={logout} />
      <ThemedText text="" />
      <ThemedButton
        type="secondary"
        title="fake"
        onPress={() => dispatch(setTheme(theme.themeId))}
      />
      <ThemedText text="" />
      <ThemedButton title="Start" onPress={() => null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
});
