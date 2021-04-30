import React from 'react';
import { StyleSheet, TextPropTypes } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../core/theme';

export default function Header({ children }: { children: React.ReactNode }) {
  return <Text style={styles.header}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
