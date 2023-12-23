import { router, useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Text } from '~components/atoms/text/Text';
import { Accordion } from '~components/molecules/accordion/Accordion';
import { KeyboardAwareFloatView } from '~components/organisms/keyboardAwareFloatView/KeyboardAwareFloatView';
import { IExercise } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export default function FindExercise() {
  const [name, setName] = useState('');
  const styles = useThemedStyles(themedStyles);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (v: string) => setName(v),
        placeholder: 'Search',
        value: name,
      },
    });
  }, [name, navigation]);

  const renderItem = useCallback(() => null, []);
  const exercises: IExercise[] = [];
  return (
    <View style={styles.container}>
      {exercises && (
        <Accordion>
          <FlatList
            removeClippedSubviews={Platform.OS === 'android'}
            scrollEventThrottle={16}
            initialNumToRender={8}
            contentContainerStyle={styles.scroll}
            data={exercises}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.name + index}
            ListHeaderComponent={
              exercises.length ? (
                <View style={styles.header}>
                  <Text text='Reorder' variant='pMDRegular' colorKey='primary' />
                  <Text variant='pMDRegular' colorKey='onSurfaceDim' text={`Exercises(${exercises.length}) `} />
                </View>
              ) : undefined
            }
          />
        </Accordion>
      )}
      <KeyboardAwareFloatView>
        <Button
          variant='primary'
          title='New Exercise'
          elevated
          onPress={() => router.push('editExercise')}
          icon={icons.Plus}
        />
      </KeyboardAwareFloatView>
    </View>
  );
}
const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme.colors.surfaceExtraDim,
    },
    scroll: {
      paddingHorizontal: theme.spacing[4],
      paddingBottom: 120,
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