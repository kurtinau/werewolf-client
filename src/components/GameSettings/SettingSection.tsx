import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { GAME_SETTING_TYPE } from './CreateGame';
import { RoleCounter } from './RoleCounter';
import { RoleListChip } from './RoleListChip';

export const SettingSection = ({ data }: { data: GAME_SETTING_TYPE }) => {
  const { sectionTitle, sectionContent, normalRole } = data;
  return (
    <>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <RoleListChip roleList={sectionContent} />
      {normalRole && (
        <>
          <Divider />
          <RoleCounter role={normalRole} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    padding: 10,
  },
});
