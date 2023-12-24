import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Card } from '~components/atoms/card/Card';
import { Input } from '~components/atoms/input/Input';
import { Label } from '~components/atoms/label/Label';
import { Text } from '~components/atoms/text/Text';
import { KeyboardSafeView } from '~components/layout/keyboardSafeView/KeyboardSafeView';
import { useAppDispatch } from '~redux/store';
import { createExercise } from '~redux/workoutCreationSlice';
import { IExercise } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export default function EditExercise() {
  const ref = useRef<ScrollView>(null);
  const [title, setTile] = useState('');
  const [scrollTo, setScrollTo] = useState(0);
  const enableScrollTo = Platform.OS === 'ios';

  const styles = useThemedStyles(themedStyles);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.y;
    setScrollTo(Math.round(onLayoutHeight));
  }, []);

  const formValues: IExercise = {
    title,
    targets: ['fullBody'],
  };

  return (
    <KeyboardSafeView>
      <ScrollView ref={ref} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Card>
          <View style={styles.item}>
            <Text>Title</Text>
            <Input value={title} onChangeValue={setTile} placeholder='Exercise Title' showMessage={false} />
          </View>
          <View style={styles.item}>
            <Text>Target Muscle</Text>
            <View>
              <Label title='Full Body' />
            </View>
          </View>
          <View style={styles.item}>
            <Text>Rest Timer</Text>
          </View>
          <View style={styles.item}>
            <Text>Exercise Link</Text>
          </View>
          <View style={[styles.item, styles.withoutBorder]} onLayout={enableScrollTo ? onLayout : undefined}>
            <Text>Exercise Notes</Text>
            <Input
              onFocus={() => {
                enableScrollTo &&
                  setTimeout(() => {
                    ref.current?.scrollTo({ y: scrollTo });
                  }, 150);
              }}
              multiline
              placeholder='Exercise Notes'
              showMessage={false}
            />
          </View>
        </Card>
      </ScrollView>
      <Button
        float
        variant='primary'
        title='Add To Workout'
        disabled={!title}
        onPress={() => {
          dispatch(createExercise(formValues));
          navigation.dispatch(StackActions.pop(2));
        }}
        icon={icons.Plus}
      />
    </KeyboardSafeView>
  );
}
const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    scroll: {
      paddingHorizontal: theme.spacing[4],
      paddingBottom: 120,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing[1],
    },
    item: {
      gap: theme.spacing[2],
      paddingVertical: theme.spacing[5],
      borderBottomWidth: 1,
      borderColor: theme.colors.outlineExtraDim,
    },
    withoutBorder: {
      borderBottomWidth: 0,
    },
  });
};
