import { Dispatch, ReactElement, SetStateAction, createContext, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IAccordionContextContextType {
  expandedIds: string[];
  setExpandedIds: Dispatch<SetStateAction<string[]>>;
  autoCollapse: boolean;
}

export const AccordionContext = createContext<IAccordionContextContextType>({
  expandedIds: [''],
  setExpandedIds: () => '',
  autoCollapse: false,
});

interface IProps {
  children?: ReactElement | ReactElement[];
  style?: StyleProp<ViewStyle>;
  autoCollapse?: boolean;
  expandedIds?: string[];
}

export const Accordion = (props: IProps) => {
  const { children, autoCollapse, expandedIds: defaultIds, style } = props;
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const styles = useThemedStyles(themedStyles);

  useEffect(() => {
    defaultIds && setExpandedIds(defaultIds);
  }, [defaultIds]);

  return (
    <AccordionContext.Provider
      value={{
        expandedIds,
        autoCollapse: !!autoCollapse,
        setExpandedIds,
      }}
    >
      <View style={[styles.container, style]}>{children}</View>
    </AccordionContext.Provider>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      gap: theme.spacing[3],
    },
  });
};
