import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { SelectItem } from '~components/atoms/selectItem/SelectItem';
import { IFolder } from '~redux/foldersSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface ISelectFolderModalProps {
  folders?: { id: IFolder['id']; name: IFolder['name'] }[];
  selectedID?: IFolder['id'];
  onSelect: (id: IFolder['id']) => void;
  onActionButton: () => void;
}

export const SelectFolder = (props: ISelectFolderModalProps) => {
  const { folders, selectedID, onSelect, onActionButton } = props;

  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.modal}>
      {folders &&
        selectedID &&
        folders.map(i => (
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
