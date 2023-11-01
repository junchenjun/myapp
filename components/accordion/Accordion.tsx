import { Dispatch, ReactElement, SetStateAction, createContext, useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

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
      <View style={[{ width: '100%' }, style]}>{children}</View>
    </AccordionContext.Provider>
  );
};
