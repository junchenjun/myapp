import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Text } from '~components/atoms/text/Text';
import { KeyboardSafeView } from '~components/layout/keyboardSafeView/KeyboardSafeView';
import { Accordion } from '~components/molecules/accordion/Accordion';
import { IActionPageHeader } from '~components/molecules/pageHeader/PageHeader';
import { IExercise } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';
import { dismissKeyboardBeforeNavigate } from '~utils/navigation';

export default function FindExercise() {
  const [title, setTitle] = useState('');
  const styles = useThemedStyles(themedStyles);
  const navigation = useNavigation();

  const headerSearchBarOptions = useMemo(() => {
    const options: IActionPageHeader['searchBar'] = {
      onChangeText: (v: string) => setTitle(v),
      placeholder: 'Search',
      value: title,
    };
    return options;
  }, [title]);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions,
    });
  }, [headerSearchBarOptions, navigation]);

  const renderItem = useCallback(() => null, []);
  const exercises: IExercise[] = [];
  return (
    <KeyboardSafeView>
      {exercises && (
        <Accordion>
          <FlatList
            removeClippedSubviews={Platform.OS === 'android'}
            scrollEventThrottle={16}
            initialNumToRender={8}
            contentContainerStyle={styles.scroll}
            data={exercises}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.title + index}
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
      <Button
        variant='primary'
        title='New Exercise'
        alignment='right'
        float
        onPress={() => dismissKeyboardBeforeNavigate('editExercise')}
        icon={icons.Star}
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
    float: {
      position: 'absolute',
      right: theme.spacing[4],
      bottom: 30,
    },
  });
};
