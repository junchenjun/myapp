import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { IIcon } from '~assets/icons';
import { Card } from '~components/atoms/card/Card';
import { Icon } from '~components/atoms/icon/Icon';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { Text } from '~components/atoms/text/Text';
import {
  IWorkoutItemHeader,
  WorkoutItemHeader,
} from '~components/organisms/workoutItem/workoutItemHeader/WorkoutContainerHeader';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export interface IWorkoutItemProps {
  children?: ReactNode | ReactNode[];
  header?: IWorkoutItemHeader;
  title?: string;
  descItems?: string[];
  onPress?: () => void;
  contained?: boolean;
  style?: StyleProp<ViewStyle>;
  actionIcon?: IIcon;
  onActionIconPress?: () => void;
}

export const WorkoutItem = (props: IWorkoutItemProps) => {
  const { title, header, descItems, onPress, style, contained, actionIcon, onActionIconPress } = props;
  const styles = useThemedStyles(themedStyles);

  const content = (
    <>
      {header && <WorkoutItemHeader {...header} />}
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
        {actionIcon && <Icon colorKey='onSurfaceExtraDim' icon={actionIcon} onPress={onActionIconPress} />}
      </View>
    </>
  );

  return contained ? (
    <Card onPress={onPress} style={style}>
      {content}
    </Card>
  ) : (
    <Pressable onPress={onPress} style={style}>
      {content}
    </Pressable>
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
