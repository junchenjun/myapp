import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Modal } from '~components/atoms/modal/Modal';
import { SelectItem } from '~components/atoms/selectItem/SelectItem';
import { Text } from '~components/atoms/text/Text';
import { IMuscleTarget } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

type ITargetMusclesModalProps = {
  targets: IMuscleTarget[];
  setTargets: Dispatch<SetStateAction<IMuscleTarget[]>>;
  modalRef: RefObject<BottomSheetModal>;
};

const equalArrays = (firstArray: string[], secondArray: string[]) => {
  if (firstArray.length !== secondArray.length) return false;
  [...firstArray].sort();
  [...secondArray].sort();

  return firstArray.every((elem, index) => elem === secondArray[index]);
};

export const TargetMusclesModal = (porps: ITargetMusclesModalProps) => {
  const { targets, setTargets, modalRef } = porps;
  const styles = useThemedStyles(themedStyles);
  const [items, setItems] = useState<IMuscleTarget[]>(targets);
  const maximumTargets = 4;

  useEffect(() => {
    setItems(targets);
  }, [targets]);

  const targetMuscles: { groupName: IMuscleTarget; subs: IMuscleTarget[] }[] = [
    {
      groupName: 'Other',
      subs: ['fullBody'],
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
      subs: ['core', 'obliques'],
    },
    {
      groupName: 'shoulders',
      subs: ['shoulders', 'traps'],
    },
    {
      groupName: 'legs',
      subs: ['glutes', 'hamstrings', 'calves', 'quads', 'hips'],
    },
  ];

  const onPress = useCallback(
    (i: IMuscleTarget) => {
      if (items.find(item => item === i)) {
        setItems(prev => {
          return prev.filter(item => item !== i);
        });
      } else if (items.length < maximumTargets) {
        setItems(prev => {
          return [...new Set([...prev, i])];
        });
      }
    },
    [items]
  );

  const onSubmit = () => {
    setTargets(items);
    modalRef.current?.dismiss();
  };

  const isDirty = useMemo(() => equalArrays(targets, items), [items, targets]);

  return (
    <Modal
      modalRef={modalRef}
      title={`Target Muscles (${items.length}/${maximumTargets})`}
      scrollEnabled
      onDismiss={() => setItems(targets)}
      floatButton={{ title: 'Done', disabled: isDirty, onPress: onSubmit }}
    >
      <View style={styles.container}>
        {targetMuscles.map(group => {
          return (
            <View key={group.groupName} style={styles.group}>
              <Text colorKey='onSurface'>{group.groupName}</Text>
              <View style={styles.items}>
                {group.subs.map(i => {
                  const selected = !!items?.find(item => item === i);
                  const disabled = !selected && items.length >= maximumTargets;
                  return (
                    <SelectItem
                      disabled={disabled}
                      key={i}
                      onPress={() => onPress(i)}
                      selected={selected}
                      variant='small'
                      title={i}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </Modal>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      paddingBottom: 30,
    },
    group: {
      gap: theme.spacing[2],
      paddingVertical: theme.spacing[5],
      borderBottomWidth: 1,
      borderColor: theme.colors.outlineExtraDim,
    },
    items: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing[2],
    },
  });
};
