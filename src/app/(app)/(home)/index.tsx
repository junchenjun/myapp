import { Suspense } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '~components/ThemedText';
import { WorkoutList } from '~components/WorkoutList';
import { ITheme } from '~redux/themeSlice';
import { getCurrentDateMDW } from '~utils/dateHelper';
import { useThemedStyles } from '~utils/hooks/useThemedStyles';

const DashBoard = () => {
  const styles = useThemedStyles(createStyles);

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <ScrollView>
        <View style={styles.listHeader}>
          <View style={styles.header}>
            <ThemedText text={getCurrentDateMDW()} size='heading2' />
          </View>
          <View style={styles.calender}>
            <BorderlessButton style={styles.day}>
              <ThemedText text='Mo' color='text100' size='body2' />
              <ThemedText text='12' color='text100' size='body2' />
            </BorderlessButton>
            <BorderlessButton style={styles.day}>
              <ThemedText text='Tu' color='text100' size='body2' />
              <ThemedText text='13' color='secondary' size='body2' />
            </BorderlessButton>
            <BorderlessButton style={styles.day}>
              <ThemedText text='We' color='text100' size='body2' />
              <ThemedText text='14' color='secondary' size='body2' />
            </BorderlessButton>
            <BorderlessButton style={styles.day}>
              <ThemedText text='Th' color='text100' size='body2' />
              <ThemedText text='15' color='secondary' size='body2' />
            </BorderlessButton>
            <BorderlessButton style={styles.day}>
              <ThemedText text='Fr' color='text100' size='body2' />
              <ThemedText text='16' color='text100' size='body2' />
            </BorderlessButton>
            <BorderlessButton style={styles.day}>
              <ThemedText text='Sa' color='text100' size='body2' />
              <ThemedText text='17' color='text100' size='body2' />
            </BorderlessButton>
            <BorderlessButton style={styles.day}>
              <ThemedText text='Su' color='text100' size='body2' />
              <ThemedText text='18' color='text100' size='body2' />
            </BorderlessButton>
          </View>
        </View>
        <Suspense fallback={<View />}>
          <WorkoutList />
        </Suspense>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashBoard;

const createStyles = (theme: ITheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.surface200,
      width: '100%',
      overflow: 'visible',
    },
    calender: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingTop: 20,
    },
    day: {
      alignItems: 'center',
    },
    listHeader: {
      paddingHorizontal: 15,
      paddingTop: 10,
      marginBottom: 20,
    },
    header: {
      width: '100%',
      paddingLeft: 9,
    },
    headerIcon: {
      color: theme.color.text100,
    },
  });
  return styles;
};
