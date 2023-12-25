import { StyleSheet, View } from 'react-native';

import { SelectItem } from '~components/atoms/selectItem/SelectItem';
import { Text } from '~components/atoms/text/Text';
import { IMuscleTarget } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export const TargetMusclesModal = () => {
  const styles = useThemedStyles(themedStyles);

  const targetMuscles: { groupName: IMuscleTarget; subs: IMuscleTarget[] }[] = [
    {
      groupName: 'fullBody',
      subs: ['other'],
    },
    {
      groupName: 'arms',
      subs: ['biceps', 'triceps', 'forearms'],
    },
    {
      groupName: 'back',
      subs: ['lats', 'midBack', 'lowerBack'],
    },
    {
      groupName: 'chest',
      subs: ['lowerChest', 'upperChest', 'midChest'],
    },
    {
      groupName: 'core',
      subs: ['obliques'],
    },
    {
      groupName: 'shoulders',
      subs: ['traps'],
    },
    {
      groupName: 'legs',
      subs: ['glutes', 'hamstrings', 'calves', 'quads', 'hips'],
    },
  ];

  return (
    <>
      <View style={styles.container}>
        {targetMuscles.map(group => {
          return (
            <View key={group.groupName} style={styles.group}>
              <Text>{group.groupName}</Text>
              <View style={styles.items}>
                <SelectItem variant='small' title={group.groupName} />
                {group.subs.map(i => {
                  return <SelectItem key={i} variant='small' title={i} />;
                })}
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      paddingBottom: 60,
    },
    group: {
      gap: theme.spacing[2],
      paddingVertical: theme.spacing[5],
      borderBottomWidth: 1,
      borderColor: theme.colors.outlineExtraDim,
    },
    items: {
      flexDirection: 'row',
      gap: theme.spacing[2],
    },
  });
};
