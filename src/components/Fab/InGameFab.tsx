import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB as PaperFAB, Modal, Portal, Switch, Text, TouchableRipple } from 'react-native-paper';
import { useDialog } from '../../context/DialogProvider';

/**
 * Fab button for InGame including
 * skills button
 * Vote button
 * God button
 */

const InGameFab = ({ castSkills }: { castSkills?: () => void }) => {
  return (
    <>
      <PaperFAB
        style={styles.fab}
        icon="lightning-bolt-outline"
        label="Skills"
        onPress={() => {
          castSkills ? castSkills() : null;
        }}
      />
      <PaperFAB style={styles.fab} icon="vote-outline" label="Vote" onPress={() => {}} />
      {/* <Dialog content={content} /> */}
    </>
  );
};

export default InGameFab;

const styles = StyleSheet.create({
  fab: {
    paddingHorizontal: 8,
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
});
