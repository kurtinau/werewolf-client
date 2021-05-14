import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import {
  Colors,
  IconButton,
  Portal,
  FAB,
  TextInput,
  Appbar,
  Button,
  Divider,
  Headline,
  Subheading,
  ToggleButton,
  Text,
} from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';
import Info from './Info';
import Seat from './Seat';
import { LobbyGameState } from '../../common/Shared';

const LobbyGameWaiting = ({
  username,
  lobbyGameState,
  lobbyGamesSeats,
  toggleSeat,
}: {
  username: string;
  lobbyGameState: LobbyGameState | null;
  lobbyGamesSeats: { [K in number]: string };
  toggleSeat: (seatNum?: number) => void;
}) => {
  const [state, setState] = useState({ open: false });

  const window = useWindowDimensions();
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  const toggleSeatHandle = (seatNum: number) => {
    // check if you sit at a seat or not
    if (Object.values(lobbyGamesSeats).includes(username)) {
      //you sit at a seat,check the seat you pressed
      if (seatNum in lobbyGamesSeats && lobbyGamesSeats[seatNum]) {
        if (lobbyGamesSeats[seatNum] === username) {
          //stand up from seat
          toggleSeat();
        } else {
          Alert.alert('You cannot sit at the seat that other players taken.');
        }
      } else {
        Alert.alert('You have taken a seat, if you want to change a seat please stand up first.');
      }
    } else {
      //you don't take any seats.
      if (seatNum in lobbyGamesSeats && lobbyGamesSeats[seatNum]) {
        //press seats that other players taken
        Alert.alert('You cannot sit at the seat that other players taken.');
      } else {
        //take a seat
        toggleSeat(seatNum);
      }
    }
  };

  const maxPlayers = lobbyGameState?.maxPlayers;
  // console.log('lobbyGameState.owner:: ', lobbyGameState.owner);

  return (
    <>
      {lobbyGameState && (
        <ScrollView style={styles.container}>
          <View style={styles.playerView}>
            {[...Array(maxPlayers)].map((x, i) => (
              <Seat
                key={i}
                seatNum={i + 1}
                toggleSeat={toggleSeatHandle}
                username={lobbyGamesSeats[i + 1]}
                owner = {lobbyGameState.owner}
              />
            ))}
          </View>
          <Divider />
          {/* <Info /> */}
          {/* {Fab(window.width)} */}
        </ScrollView>
      )}
      {/* <Portal>
        <FAB.Group
          visible={true}
          fabStyle={{ position: 'absolute', alignSelf: 'center', bottom: 0 }}
          style={[styles.fab]}
          open={open}
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            {
              icon: 'plus',
              onPress: () => console.log('Pressed add'),
              style: { paddingRight: 50 },
            },
            {
              icon: 'star',
              label: 'Star',
              onPress: () => console.log('Pressed star'),
              // style: { position: 'absolute', alignSelf: 'center', bottom: 0, }
            },
            {
              icon: 'email',
              label: 'Email',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => console.log('Pressed notifications'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal> */}
    </>
  );
};

export default LobbyGameWaiting;

function Fab(width) {
  return (
    <View style={styles.fabView}>
      <FAB
        style={{ position: 'absolute', margin: 0, right: width / 2, bottom: 20 }}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        style={{ position: 'absolute', margin: 16, alignSelf: 'center', bottom: 0 }}
        small
        icon="minus"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        style={{ position: 'absolute', margin: 16, right: 100, bottom: 0 }}
        small
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    flex: 1,
    flexDirection: 'column',
    marginTop: getStatusBarHeight() + 40,
  },
  playerView: {
    // flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoView: {
    // flex: 5,
    marginTop: 10,
  },
  fabView: {
    // flex: 1,
  },
  fab: {
    position: 'absolute',
    // margin: 40,
    right: 0,
    bottom: 0,
    // alignSelf: 'center',
    // paddingRight: 50
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 5,
  },
});
