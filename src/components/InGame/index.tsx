import React, { ReactNode, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import * as Shared from '../../common/Shared';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Seat from '../Lobby/Seat';
// import Fab from '../Fab/Fab';
import Info from '../Lobby/Info';
import { Audio } from 'expo-av';
import SoundPlayer from './SoundPlayer';
import { AVPlaybackSource } from 'expo-av/build/AV';
import SoundsDynamic from '../../utils/soundsDynamic';
import { gameActionMessage } from '../../utils/Socket';
import { getRandomNumberInRange } from '../../utils/commonUtils';
import Fab from '../Fab';

const InGame = ({
  gameState,
  roomState,
  username,
  sendMessage,
}: {
  gameState: Shared.GameState;
  roomState: Shared.RoomState;
  username: string;
  sendMessage: (message: gameActionMessage) => void;
}) => {
  const { owner, wildMode, seats, configOverview } = roomState;
  const { phase, players, rolesName, leftoverRoles } = gameState;

  const audioPath = '../../assets/audio';
  const [currentRoleIndex, setCurrentRoleIndex] = useState(-1);
  const [phaseState, setPhaseState] = useState(phase);

  const gameFlowSound = SoundsDynamic.gameFlow;
  const currentRole = rolesName[currentRoleIndex];
  const roleSound = SoundsDynamic.roles[currentRole];
  const skillSound = SoundsDynamic.skills[currentRole];
  const [soundPlayList, setSoundPlayList] = useState<AVPlaybackSource[]>([gameFlowSound.start]);

  useEffect(() => {
    switch (phaseState) {
      case Shared.Phases.STARTED:
        // setSoundPlayList([gameFlowSound.start]);
        break;
      case Shared.Phases.NIGHTTIME:
        const newPlayList = [roleSound];
        newPlayList.push(gameFlowSound.openEyes);
        newPlayList.push(roleSound);
        newPlayList.push(skillSound);
        setSoundPlayList(newPlayList);
        break;
      case Shared.Phases.NIGHTTIMEVOTING:
        break;
      case Shared.Phases.NIGHTTIMEVOTINGDONE:
        const closeEyesPlayList = [roleSound];
        closeEyesPlayList.push(gameFlowSound.closeEyes);
        setSoundPlayList(closeEyesPlayList);
        break;
      case Shared.Phases.ENDOFNIGHT:
        break;
      case Shared.Phases.DAYTIME:
        break;
      case Shared.Phases.DAYTIMEVOTING:
        break;
      case Shared.Phases.ENDOFDAY:
        break;
      case Shared.Phases.OVER:
        break;
      default:
        break;
    }
  }, [phaseState]);

  const createNewPlayListHandler = () => {
    console.log('new playlist');
    setCurrentRoleIndex((currentRoleIndex) => currentRoleIndex + 1);
    setPhaseState(Shared.Phases.NIGHTTIME);
  };

  const enterNightVotingPhaseHandler = () => {
    console.log('enter nightvoting phase');
    if (wildMode) {
      //need to check if role has been selected
      if (leftoverRoles.includes(currentRole)) {
        setTimeout(() => {
          console.log('asdfsf');
          setPhaseState(Shared.Phases.NIGHTTIMEVOTINGDONE);
        }, getRandomNumberInRange(8000, 15000));
      } else {
        setPhaseState(Shared.Phases.NIGHTTIMEVOTING);
      }
    } else {
      setPhaseState(Shared.Phases.NIGHTTIMEVOTING);
    }
  };

  const castSkillsHandler = () => {
    if (currentRole) {
      if (currentRole === 'werewolf') {
        if (players[username].isWerewolf) {
          console.log('somebody press skills button.');
          sendMessage({ type: Shared.ClientMessageType.SKILLSCAST });
        }
      } else {
        if (currentRole === Object.keys(Shared.RolesCode)[players[username].role]) {
          console.log('somebody press skills button.');
          sendMessage({ type: Shared.ClientMessageType.SKILLSCAST });
        }
      }
    }
  };

  return (
    <>
      {gameState && roomState && (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.playerView}>
              {Object.keys(players).map((key, i) => (
                <Seat key={key} seatNum={players[key].seatNum} username={key} owner={owner} />
              ))}
            </View>
            <Divider />
            {/* <Info /> */}
          </ScrollView>
          <Fab
            role={players[username]?.role}
            wildMode={wildMode}
            yourSeatNum={players[username]?.seatNum}
            gameConfigOverview={configOverview}
            roomOwner={username === owner}
            inGameState={true}
            // currentRole={currentRole}
            castSkills={castSkillsHandler}
            // isWerewolf = {players[username]?.isWerewolf}
          />
          <SoundPlayer
            source={soundPlayList}
            getNewPlayList={createNewPlayListHandler}
            enterNightVotingPhase={enterNightVotingPhaseHandler}
          />
          {/* <PlayingSound playlist={} /> */}
        </>
      )}
    </>
  );
};

export default InGame;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 5,
  },
});
