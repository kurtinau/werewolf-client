import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { NORMAL_ROLE_TYPE } from './CreateGame';

export const RoleCounter = ({ role }: { role: NORMAL_ROLE_TYPE }) => {
  const { title, value, valueIncrement, valueDecrement } = role;
  return (
    <View style={styles.roleCounterContainer}>
      <Text style={styles.roleConterTitle}>{title}</Text>
      <IconButton icon="minus" size={20} onPress={valueDecrement} />
      <TextInput disabled={true} value={value + ''} style={styles.textinputStyle} />
      <IconButton icon="plus" size={20} onPress={valueIncrement} />
    </View>
  );
};

const styles = StyleSheet.create({
  roleCounterContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: '#dfe5e8',
  },
  roleConterTitle: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    fontSize: 15,
  },
  textinputStyle: {
    height: 20,
    // backgroundColor: '#dfe5e8',
    alignSelf: 'center',
  },
});
