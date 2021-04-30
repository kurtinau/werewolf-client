import React from 'react';
import { ViewStyle } from 'react-native';
import { StyleProp } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

type BUTTON_MODE_TYPE = 'text' | 'outlined' | 'contained';

const Button = ({
  mode,
  style,
  onPress,
  children,
}: {
  mode: BUTTON_MODE_TYPE;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  children: React.ReactNode;
}) => (
  <PaperButton
    style={[styles.button, mode === 'outlined' && { backgroundColor: theme.colors.surface }, style]}
    labelStyle={styles.text}
    mode={mode}
    onPress={onPress}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default Button;
