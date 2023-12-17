import { ReactElement } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { AccordionItem } from '~components/accordion/accordionItem/AccordionItem';
import { Card } from '~components/card/Card';
import { Text } from '~components/text/Text';
import {
  IWorkoutContainerHeader,
  WorkoutContainerHeader,
} from '~components/workoutContainer/workoutContainerHeader/WorkoutContainerHeader';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  title?: string;
  descItems?: string[];
  header?: IWorkoutContainerHeader;
  accordionContent?: ReactElement;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const WorkoutContainer = (props: IProps) => {
  const { title, header, descItems, accordionContent, onPress, style } = props;
  const styles = useThemedStyles(themedStyles);

  const mainContent = (
    <>
      <Text variant='h5Regular' text={title} style={styles.title} />
      <View style={styles.desc}>
        {descItems?.map((i, index) => {
          const showDivider = index !== descItems.length - 1;
          if (showDivider) {
            return (
              <View style={styles.showDivider} key={i}>
                <Text variant='pSMRegular' text={i} color='onSurfaceDim' />
                <View style={styles.dot} />
              </View>
            );
          }
          return <Text key={i} variant='pSMRegular' text={i} color='onSurfaceDim' />;
        })}
      </View>
    </>
  );

  if (!accordionContent) {
    return (
      <Card onPress={onPress} style={style}>
        <WorkoutContainerHeader {...header} />
        {mainContent}
      </Card>
    );
  } else {
    return (
      <Card onPress={onPress} style={style}>
        <AccordionItem
          trigger={triggerButton => (
            <>
              <WorkoutContainerHeader {...header} />
              <View style={styles.main}>
                <View>{mainContent}</View>
                {triggerButton}
              </View>
            </>
          )}
        >
          {accordionContent}
        </AccordionItem>
      </Card>
    );
  }
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
