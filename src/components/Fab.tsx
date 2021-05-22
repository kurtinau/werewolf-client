import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, useWindowDimensions, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FAB as PaperFAB, Modal, Portal, Switch, Text, TouchableRipple } from 'react-native-paper';
import Header from './Header';
import Paragraph from './Paragraph';
import * as Shared from '../common/Shared';
import ImagesDynamic from '../utils/imagesDynamic';

const Fab = ({
  role,
  wildMode,
  startGamePressed,
  shufflePressed,
  yourSeatNum,
  gameConfigOverview,
  roomOwner,
  roleRevealed,
  wildModeToggle,
  inGameState,
}: {
  role: number;
  wildMode: boolean;
  startGamePressed?: (wild: boolean) => void;
  shufflePressed?: (wild: boolean) => void;
  yourSeatNum: number;
  gameConfigOverview: string;
  roomOwner: boolean;
  roleRevealed?: () => void;
  wildModeToggle?: () => void;
  inGameState: boolean;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => {
    setModalVisible(false);
    setRoleVisible(false);
  };
  //   const [role, setRole] = useState({
  //     name: 'roleCover',
  //     visible: false,
  //   });
  const [roleName, setRoleName] = useState('roleCover');
  const [roleVisible, setRoleVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  //TODO bug found automatically shuffle cards.
  useEffect(() => {
    if (yourSeatNum !== 0 && role !== -1) {
      const roleName = Object.keys(Shared.RolesCode)[role];
      setRoleName(roleName);
    }
  }, [yourSeatNum, role]);

  const window = useWindowDimensions();
  const windowWidth = window.width;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.fabView}>
          {roomOwner && !inGameState && (
            <>
              <PaperFAB
                small
                style={styles.fab}
                icon="play-circle-outline"
                label="Start Game"
                onPress={() => (startGamePressed ? startGamePressed(wildMode) : null)}
              />
              <PaperFAB
                style={styles.fab}
                icon="cards-playing-outline"
                label="Shuffle"
                onPress={() => (shufflePressed ? shufflePressed(wildMode) : null)}
              />
            </>
          )}
          {inGameState ? (
            <>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <PaperFAB
                  style={styles.fab}
                  icon="lightning-bolt-outline"
                  label="Skills"
                  onPress={() => {}}
                />
                <PaperFAB style={styles.fab} icon="vote-outline" label="Vote" onPress={() => {}} />
              </View>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                {inGameState && (
                  <PaperFAB
                    style={styles.fab}
                    icon="eye-circle-outline"
                    label="God"
                    onPress={() => {}}
                  />
                )}
                <PaperFAB icon="card-account-details-outline" label="Role" onPress={showModal} />
              </View>
            </>
          ) : (
            <PaperFAB icon="card-account-details-outline" label="Role" onPress={showModal} />
          )}
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
