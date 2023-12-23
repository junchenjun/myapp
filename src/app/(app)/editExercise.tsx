import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Card } from '~components/atoms/card/Card';
import { Text } from '~components/atoms/text/Text';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { IExercise } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export default function EditExercise() {
  const [name, setName] = useState('');
  const folders = useAppSelector(state => state.folders);
  const styles = useThemedStyles(themedStyles);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  //   const ITEM_HEIGHT = 126;

  const renderItem = useCallback(({ item }: { item: IExercise }) => null, []);
  const exercises: IExercise[] = [];
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        // contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Card>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
          <Text>sss</Text>
        </Card>
      </ScrollView>
      <View style={styles.float}>
        <Button
          variant='primary'
          title='Add To Workout'
          elevated
          onPress={() => navigation.dispatch(StackActions.pop(2))}
          icon={icons.Plus}
        />
      </View>
    </View>
  );
}
const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    scroll: {
      paddingHorizontal: theme.spacing[4],
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing[1],
    },
    float: {
      position: 'absolute',
      right: theme.spacing[4],
      bottom: 30,
    },
  });
};
