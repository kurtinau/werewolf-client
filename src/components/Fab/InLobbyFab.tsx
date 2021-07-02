import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB as PaperFAB, Modal, Portal, Switch, Text, TouchableRipple } from 'react-native-paper';
/**
 * Fab button for InLobby including
 * Start Game button
 * Shuffle button
 */

const InLobbyFab = ({
  startGamePressed,
  shufflePressed,
}: {
  startGamePressed?: () => void;
  shufflePressed?: () => void;
}) => {
  return (
    <>
      <PaperFAB
        small
        style={styles.fab}
        icon="play-circle-outline"
        label="Start Game"
        onPress={() => (startGamePressed ? startGamePressed() : null)}
      />
      <PaperFAB
        style={styles.fab}
        icon="cards-playing-outline"
        label="Shuffle"
        onPress={() => (shufflePressed ? shufflePressed() : null)}
      />
    </>
  );
};

export default InLobbyFab;

const styles = StyleSheet.create({
  fab: {
    paddingHorizontal: 8,
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
});
