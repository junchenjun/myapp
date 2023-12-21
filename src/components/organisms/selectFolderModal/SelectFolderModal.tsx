import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { SelectItem } from '~components/atoms/selectItem/SelectItem';
import { IPlan } from '~redux/planSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface ISelectFolderModalProps {
  folders: { id: IPlan['id']; name: IPlan['name'] }[];
  selectedID: IPlan['id'];
  onSelect: (id: IPlan['id']) => void;
  onActionButton: () => void;
}

export const SelectFolderModal = (props: ISelectFolderModalProps) => {
  const { folders, selectedID, onSelect, onActionButton } = props;

  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.modal}>
      {folders.map(i => (
        <SelectItem
          key={i.id}
          title={i.name}
          onPress={() => onSelect(i.id)}
          selected={i.id === selectedID}
          variant='large'
        />
      ))}
      <Button onPress={onActionButton} icon={icons.Plus} title='New Folder' variant='ghost' />
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    modal: {
      gap: theme.spacing[3],
      paddingTop: theme.spacing[5],
    },
  });
};
