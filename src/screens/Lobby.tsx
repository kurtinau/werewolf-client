import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Button from '../components/Button';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import TextInput from '../components/TextInput';
import { roomNumValidator } from '../utils/roomNumValidator';

const Lobby = ({
  navigateCreate,
  joinGame,
}: {
  navigateCreate: () => void;
  joinGame: (roomNum: string) => void;
}) => {
  const [room, setRoom] = useState({ value: '', error: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const onOkPressed = () => {
    const roomNumError = roomNumValidator(room.value.trim());
    if (roomNumError) {
      setRoom({ ...room, error: roomNumError });
      return;
    }
    joinGame(room.value.trim());
  };
  return (
    <>
      <Header>In Lobby</Header>
      <Paragraph>Click the button below to create a new game or join an existing game.</Paragraph>
      <Button mode="outlined" onPress={navigateCreate}>
        Create Game
      </Button>
      <Button mode="outlined" onPress={showModal}>
        Join a Room
      </Button>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
          style={{ margin: 25 }}
        >
          <TextInput
            label="Room Number"
            value={room.value}
            onChangeText={(text) => setRoom({ value: text, error: '' })}
            keyboardType={'number-pad'}
            error={!!room.error}
            errorText={room.error}
          />
          <View style={styles.buttonViewStyle}>
            <Button
              mode="outlined"
              onPress={onOkPressed}
              style={{ width: 100, height: 50, marginLeft: 20 }}
            >
              Ok
            </Button>
            <Button mode="outlined" onPress={hideModal} style={{ width: 100, height: 50 }}>
              Cancel
            </Button>
          </View>

          {/* <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
          </View>
        </View> */}
        </Modal>
      </Portal>
    </>
  );
};

export default Lobby;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
  buttonViewStyle: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
  },
});
