import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, useWindowDimensions, Alert } from 'react-native';
import { FAB as PaperFAB, Modal, Portal, Switch, Text, TouchableRipple } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../Header';
import Paragraph from '../Paragraph';
import * as Shared from '../../common/Shared';
import ImagesDynamic from '../../utils/imagesDynamic';
import InGameFab from './InGameFab';
import InLobbyFab from './InLobbyFab';

const Fab = ({
  inGameState,
  roomOwner,
  wildMode,
  role,
  yourSeatNum,
  gameConfigOverview,
  wildModeToggle,
  startGamePressed,
  shufflePressed,
  roleRevealed,
  castSkills,
}: {
  inGameState: boolean;
  roomOwner: boolean;
  wildMode: boolean;
  role: number;
  gameConfigOverview: string;
  yourSeatNum: number;
  wildModeToggle?: () => void;
  startGamePressed?: () => void;
  shufflePressed?: () => void;
  roleRevealed?: () => void;
  castSkills?: () => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => {
    setModalVisible(false);
    setRoleVisible(false);
  };
  const [roleName, setRoleName] = useState('roleCover');
  const [roleVisible, setRoleVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (yourSeatNum !== 0 && role !== -1) {
      const roleName = Object.keys(Shared.RolesCode)[role];
      setRoleName(roleName);
    }
  }, [yourSeatNum, role]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.fabView}>
          {inGameState ? (
            <>
              <InGameFab castSkills={castSkills}/>
              {roomOwner ? (
                <PaperFAB
                  style={styles.fab}
                  icon="eye-circle-outline"
                  label="God"
                  onPress={() => {}}
                />
              ) : null}
            </>
          ) : (
            <>
              {roomOwner ? (
                <InLobbyFab startGamePressed={startGamePressed} shufflePressed={shufflePressed} />
              ) : null}
            </>
          )}
          <PaperFAB icon="card-account-details-outline" label="Role" onPress={showModal} />
        </View>

        <View style={styles.switchView}>
          <Text>Wild Mode: </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch
              value={wildMode}
              onValueChange={wildModeToggle}
              disabled={inGameState ? true : !roomOwner}
            />
            {!roomOwner && wildMode && <Text>on</Text>}
          </View>
        </View>
      </View>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
          style={{ margin: 25 }}
        >
          <ScrollView>
            <Header>当前配置：</Header>
            <Paragraph>{gameConfigOverview}</Paragraph>
            <Header>你的角色：</Header>
            <TouchableRipple
              style={styles.ripple}
              onPressIn={() => {
                if (yourSeatNum !== 0 && role !== -1 && !revealed && !roleVisible) {
                  setRevealed(true);
                  roleRevealed ? roleRevealed() : null;
                }
              }}
              onPress={() => {
                if (yourSeatNum === 0) {
                  Alert.alert('Please have a sit first.');
                } else {
                  if (role !== -1) {
                    setRoleVisible((roleVisible) => {
                      // if (roleVisible) {
                      //   setRevealed(true);
                      // }
                      return !roleVisible;
                    });
                  } else {
                    if (roomOwner) {
                      Alert.alert(
                        'Please shuffle cards before you want to check your role detail.',
                      );
                    } else {
                      Alert.alert('Waiting for room owner to shuffle the cards.');
                    }
                  }
                }
              }}
            >
              <Image
                source={roleVisible ? ImagesDynamic[roleName] : ImagesDynamic['roleCover']}
                style={[styles.roleImage, { width: 150, height: 250 }]}
              />
            </TouchableRipple>

            {wildMode && (
              <>
                <Header>Wild Mode：</Header>
                <Paragraph>牌数比玩家多，未知角色在牌堆里。</Paragraph>
              </>
            )}
          </ScrollView>
        </Modal>
      </Portal>
    </>
  );
};

export default Fab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    margin: 10,
    alignSelf: 'center',
    bottom: 20,
    flexDirection: 'row',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  fabView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  fab: {
    paddingHorizontal: 8,
    // paddingVertical: 6,
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  switchView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleImage: {
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
