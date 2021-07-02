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
  Switch,
  Dialog,
} from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../../core/theme';
import Info from './Info';
import Seat from './Seat';
import { ClientMessageType, LobbyGameState } from '../../common/Shared';
// import Fab from '../Fab/Fab';
import { gameActionMessage } from '../../utils/Socket';
import Paragraph from '../Paragraph';
import Fab from '../Fab';

const LobbyGameWaiting = ({
  username,
  lobbyGameState,
  toggleSeat,
  shuffleCards,
  roleRevealed,
  wildModeToggle,
  startGame,
}: {
  username: string;
  lobbyGameState: LobbyGameState;
  toggleSeat: (seatNum?: number) => void;
  shuffleCards: (wild?: boolean) => void;
  roleRevealed: () => void;
  wildModeToggle: () => void;
  startGame: () => void;
}) => {
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const { maxPlayers, wildMode, owner, configOverview, seats, players } = lobbyGameState;

  console.log('lobbygameWaiting__lobbyGameState:: ', lobbyGameState);

  const toggleSeatHandle = (seatNum: number) => {
    // check if you sit at a seat or not
    if (Object.values(seats).includes(username)) {
      //you sit at a seat,check the seat you pressed
      if (seatNum in seats && seats[seatNum]) {
        if (seats[seatNum] === username) {
          //stand up from seat
          if(players[username].role !== -1){
            showDialog();
          }else{
            toggleSeat();
          }
          console.log('stand up from ', seatNum);
        } else {
          Alert.alert('You cannot sit at the seat that other players taken.');
        }
      } else {
        Alert.alert('You have taken a seat, if you want to change a seat please stand up first.');
      }
    } else {
      //you don't take any seats.
      if (seatNum in seats && seats[seatNum]) {
        //press seats that other players taken
        Alert.alert('You cannot sit at the seat that other players taken.');
      } else {
        //take a seat
        console.log('take a seat: ', seatNum);
        toggleSeat(seatNum);
      }
    }
  };

  const checkAllPlayersHaveAseat = () => (seats ? Object.keys(seats).length === maxPlayers : false);

  const checkAllAttendedPlayersHaveAseat = () => {
    return seats ? Object.keys(seats).length === Object.keys(players).length : false;
  };

  const startGamePressedHandle = () => {
    if (players[username].role === -1) {
      Alert.alert('Please shuffle cards before starting game.');
    } else {
      if (wildMode) {
        if (checkAllAttendedPlayersHaveAseat()) {
          startGame();
        }
      } else {
        if (checkAllPlayersHaveAseat()) {
          startGame();
        } else {
          Alert.alert('There are players not ready or Not enough players.');
        }
      }
    }
  };

  const shufflePressedHandle = () => {
    if (wildMode) {
      if (checkAllAttendedPlayersHaveAseat()) {
        console.log('wild mode shuffle cards called.');
        shuffleCards(wildMode);
      } else {
        Alert.alert('All players must have a sit.');
      }
    } else {
      if (checkAllPlayersHaveAseat()) {
        shuffleCards();
      } else {
        Alert.alert('There are players not ready or Not enough players.');
      }
    }
  };

  return (
    <>
      {lobbyGameState && lobbyGameState.players &&(
        <>
          <ScrollView style={styles.container}>
            <View style={styles.playerView}>
              {[...Array(maxPlayers)].map((x, i) => {
                return (
                  <Seat
                    key={i}
                    seatNum={i + 1}
                    toggleSeat={toggleSeatHandle}
                    username={seats[i + 1]}
                    owner={owner}
                  />
                );
              })}
            </View>
            <Divider />
            {/* <Info /> */}
          </ScrollView>
          <Fab
            role={players[username]?.role}
            wildMode={wildMode}
            startGamePressed={startGamePressedHandle}
            shufflePressed={shufflePressedHandle}
            yourSeatNum={players[username]?.seatNum}
            gameConfigOverview={configOverview}
            roomOwner={username === owner}
            roleRevealed={roleRevealed}
            wildModeToggle={wildModeToggle}
            inGameState={false}
          />
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Content>
                <Paragraph>
                  Are you sure to change seat? Press OK will re-shuffle cards.
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button
                  onPress={() => {
                    toggleSeat();
                    hideDialog();
                  }}
                >
                  Ok
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </>
      )}
    </>
  );
};

export default LobbyGameWaiting;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    width: '100%',
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
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 5,
  },
});
