import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const maximumTargets = 4;

  useEffect(() => {
    setItems(targets);
  }, [targets]);

  const targetMuscles: { name: IMuscleTarget; items: IMuscleTarget[] }[] = [
    {
      name: 'fullBody',
      items: ['fullBody'],
    },
    {
      name: 'arms',
      items: ['biceps', 'triceps', 'forearms'],
    },
    {
      name: 'back',
      items: ['lats', 'midBack', 'lowerBack'],
    },
    {
      name: 'chest',
      items: ['lowerChest', 'upperChest', 'midChest'],
    },
    {
      name: 'core',
      items: ['core', 'obliques'],
    },
    {
      name: 'shoulders',
      items: ['shoulders', 'traps'],
    },
    {
      name: 'legs',
      items: ['glutes', 'hamstrings', 'calves', 'quads', 'hips'],
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
      title={`${t('targetMuscles')} (${items.length}/${maximumTargets})`}
      scrollEnabled
      onDismiss={() => setItems(targets)}
      floatButton={{ title: t('save'), disabled: isDirty, onPress: onSubmit }}
    >
      <View style={styles.container}>
        {targetMuscles.map((group, index) => {
          return (
            <View key={group.name} style={[styles.group, index === targetMuscles.length - 1 && styles.topGroup]}>
              <Text variant='pLGLight' colorKey='onSurfaceDim'>
                {t(group.name)}
              </Text>
              <View style={styles.items}>
                {group.items.map(i => {
                  const selected = !!items?.find(item => item === i);
                  const disabled = !selected && items.length >= maximumTargets;
                  return (
                    <SelectItem
                      disabled={disabled}
                      key={i}
                      onPress={() => onPress(i)}
                      selected={selected}
                      variant='small'
                      title={t(i)}
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
      paddingBottom: 70,
      paddingTop: theme.spacing[2],
    },
    group: {
      gap: theme.spacing[2],
      paddingVertical: theme.spacing[4],
      borderBottomWidth: 1,
      borderColor: theme.colors.outlineExtraDim,
    },
    topGroup: {
      borderBottomWidth: 0,
    },
    items: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing[2],
    },
  });
};
