import React from 'react';
import { Pressable, useWindowDimensions, Image, StyleSheet } from 'react-native';
import { theme } from '../../core/theme';
import { Text, Avatar } from 'react-native-paper';

const Seat = ({
  seatNum,
  toggleSeat,
  username,
  owner,
}: {
  seatNum: number;
  toggleSeat?: (seatNum: number) => void;
  username: string | undefined;
  owner: string;
}): JSX.Element => {
  const window = useWindowDimensions();
  const windowWidth = window.width;
  return (
    <Pressable
      onPress={() => {
        toggleSeat ? toggleSeat(seatNum) : null;
      }}
    >
      <Image
        source={require('../../assets/logo-1.png')}
        style={[
          styles.playerIcon,
          { width: (windowWidth - 50) / 5, height: (windowWidth - 50) / 5 },
        ]}
      />
      <Text style={{ marginLeft: 10 }}>{username ? username : 'Empty'}</Text>
      <Avatar.Icon
        size={25}
        icon={'numeric-' + seatNum + '-box'}
        style={{ position: 'absolute', left: 3, top: 3 }}
      />
      {username && username == owner && (
        <Avatar.Icon
          size={20}
          icon="home-outline"
          style={{ position: 'absolute', right: 3, top: 3, backgroundColor: 'red' }}
        />
      )}
    </Pressable>
  );
};

export default Seat;

const styles = StyleSheet.create({
  playerIcon: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
