import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../core/theme';

const RoomHeader = ({ roomNum }: { roomNum: string }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 15 + getStatusBarHeight(),

        // fontSize: 25
      }}
    >
      <Text style={{ fontSize: 21, color: theme.colors.primary, fontWeight: 'bold' }}>
        Room {roomNum}
      </Text>
    </View>
  );
};

export default RoomHeader;
