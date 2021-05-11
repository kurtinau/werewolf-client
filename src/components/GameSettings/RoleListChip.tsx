import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { ROLE_SETTING_TYPE } from './CreateGame';

export const RoleListChip = ({ roleList }: { roleList: ROLE_SETTING_TYPE[] }) => {
  return (
    <View style={styles.chipContainer}>
      {roleList.map((item, index: number) => (
        <Chip
          key={index}
          icon={item.selected ? 'handshake' : 'hand'}
          mode="outlined"
          onPress={item.onPress}
          selected={item.selected}
          style={styles.chipStyle}
        >
          {item.title}
        </Chip>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: '#dfe5e8',
  },
  chipStyle: { marginHorizontal: 5, marginVertical: 10 },
});
