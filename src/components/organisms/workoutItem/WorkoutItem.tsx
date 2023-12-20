import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { icons } from '~assets/icons';
import { Card } from '~components/atoms/card/Card';
import { Icon } from '~components/atoms/icon/Icon';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { Text } from '~components/atoms/text/Text';
import { IBottomMenuItems } from '~components/organisms/bottomMenu/BottomMenu';
import {
  IWorkoutItemHeader,
  WorkoutItemHeader,
} from '~components/organisms/workoutItem/workoutItemHeader/WorkoutContainerHeader';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export interface IWorkoutItemProps {
  title?: string;
  descItems?: string[];
  header?: IWorkoutItemHeader;
  accordionToggle?: () => void;
  open?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode | ReactNode[];
  menu?: IBottomMenuItems;
  accordionItem?: boolean;
}

export const WorkoutItem = (props: IWorkoutItemProps) => {
  const { title, header, descItems, onPress, style, accordionToggle, menu, open, accordionItem } = props;
  const styles = useThemedStyles(themedStyles);

  const mainContent = (
    <>
      {header && <WorkoutItemHeader {...header} menu={menu} />}
      <View style={styles.main}>
        <View>
          <Text variant='h5Regular' text={title} style={styles.title} />
          <View style={styles.desc}>
            {descItems?.map((i, index) => {
              const showDivider = index !== descItems.length - 1;
              if (showDivider) {
                return (
                  <View style={styles.showDivider} key={i}>
                    <Text variant='pSMRegular' text={i} colorKey='onSurfaceDim' />
                    <View style={styles.dot} />
                  </View>
                );
              }
              return <Text key={i} variant='pSMRegular' text={i} colorKey='onSurfaceDim' />;
            })}
          </View>
        </View>
        {accordionToggle && (
          <Icon
            colorKey='onSurfaceExtraDim'
            icon={open ? icons.ExpandUp : icons.ExpandDown}
            onPress={accordionToggle}
          />
        )}
      </View>
    </>
  );

  return accordionItem ? (
    <Pressable onPress={onPress} style={style}>
      {mainContent}
    </Pressable>
  ) : (
    <Card onPress={onPress} style={style}>
      {mainContent}
    </Card>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    title: {
      marginTop: theme.spacing[2],
    },
    desc: {
      flexDirection: 'row',
    },
    showDivider: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dot: {
      width: 3,
      height: 3,
      backgroundColor: theme.colors.onSurfaceExtraDim,
      borderRadius: theme.radius.round,
      marginHorizontal: theme.spacing[2],
    },
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
};
