import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import {
  Chip,
  Divider,
  IconButton,
  TextInput,
  List,
  Button,
  Portal,
  Dialog,
} from 'react-native-paper';
import * as Shared from '../../common/Shared';
import { SettingSection } from './SettingSection';
import { useGameSettings } from '../../context/GameSettingsProvider';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Paragraph from '../Paragraph';

export type ROLE_SETTING_TYPE = {
  title: string;
  onPress: () => void;
  selected: boolean;
};

export type NORMAL_ROLE_TYPE = {
  title: string;
  value: number;
  valueIncrement: () => void;
  valueDecrement: () => void;
};

export type GAME_SETTING_TYPE = {
  sectionTitle: string;
  sectionContent: ROLE_SETTING_TYPE[];
  normalRole?: NORMAL_ROLE_TYPE;
};

export type GAME_SETTING_DATA_TYPE = {
  // configOverview: string;
  count: number;
  villager: number;
  numVillagers: number;
  werewolf: number;
  numWerewolves: number;
  oldMan?: boolean;
  seer?: boolean;
  fool?: boolean;
  hunter?: boolean;
  bodyguard?: boolean;
  witch?: boolean;
  alphawolf?: boolean;
  mysticwolf?: boolean;
  elixirAbility?: string;
  poisonAbility?: string;
  bodyguardAbility?: string;
};

export default function CreateGame({
  submitSettings,
}: {
  submitSettings: (data: GAME_SETTING_DATA_TYPE) => void;
}) {
  const [elixirSkillExpanded, setElixirSkillExpanded] = useState(false);
  const [poisonSkillExpanded, setPoisonSkillExpanded] = useState(false);
  const [bodyGuardSkillExpanded, setBodyGuardSkillExpanded] = useState(false);

  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const {
    villager,
    oldMan,
    seer,
    fool,
    hunter,
    bodyguard,
    witch,
    werewolf,
    alphawolf,
    mysticwolf,
    elixirAbility,
    poisonAbility,
    bodyguardAbility,
    villagerIncrease,
    villagerDecrease,
    toggleOldMan,
    toggleSeer,
    toggleFool,
    toggleHunter,
    toggleBodyguard,
    toggleWitch,
    werewolfIncrease,
    werewolfDecrease,
    toggleAlphaWolf,
    toggleMysticWolf,
    setElixirAbility,
    setPoisonAbility,
    setBodyguardAbility,
    getNumWerewolves,
    getMaxPlayers,
  } = useGameSettings();

  const villagersSettingData: ROLE_SETTING_TYPE[] = [
    {
      title: '?????????',
      onPress: toggleSeer,
      selected: seer,
    },
    {
      title: '??????',
      onPress: toggleFool,
      selected: fool,
    },
    {
      title: '??????',
      onPress: toggleHunter,
      selected: hunter,
    },
    {
      title: '??????',
      onPress: toggleBodyguard,
      selected: bodyguard,
    },
    {
      title: '??????',
      onPress: toggleWitch,
      selected: witch,
    },
  ];

  const werewolfSettingData: ROLE_SETTING_TYPE[] = [
    {
      title: '??????',
      onPress: toggleAlphaWolf,
      selected: alphawolf,
    },
    {
      title: '??????',
      onPress: toggleMysticWolf,
      selected: mysticwolf,
    },
  ];

  const normalVillagerSettingData: ROLE_SETTING_TYPE[] = [
    {
      title: '?????????',
      onPress: toggleOldMan,
      selected: oldMan,
    },
  ];

  const elixirAbilitySettingData = {
    [Shared.Abilities.Elixir.CANNOTSAVEYOURSELF]: {
      title: '???????????????',
      onPress: () => setElixirAbility(Shared.Abilities.Elixir.CANNOTSAVEYOURSELF),
    },
    [Shared.Abilities.Elixir.CANSAVEYOURSELF]: {
      title: '????????????',
      onPress: () => setElixirAbility(Shared.Abilities.Elixir.CANSAVEYOURSELF),
    },
    [Shared.Abilities.Elixir.CANSAVEYOURSELFONLY1STNIGHT]: {
      title: '???????????????????????????',
      onPress: () => setElixirAbility(Shared.Abilities.Elixir.CANSAVEYOURSELFONLY1STNIGHT),
    },
  };

  const poisonAbilitySettingData = {
    [Shared.Abilities.Poison.CANNOTUSEWITHELIXIR]: {
      title: '??????????????????????????????',
      onPress: () => setPoisonAbility(Shared.Abilities.Poison.CANNOTUSEWITHELIXIR),
    },
    [Shared.Abilities.Poison.CANUSEWITHELIXIR]: {
      title: '??????????????????????????????',
      onPress: () => setPoisonAbility(Shared.Abilities.Poison.CANUSEWITHELIXIR),
    },
  };

  const bodyguardAbilitySettingData = {
    [Shared.Abilities.Bodyguard.DEADWHENGUARDANDSAVE]: {
      title: '???????????????????????????',
      onPress: () => setBodyguardAbility(Shared.Abilities.Bodyguard.DEADWHENGUARDANDSAVE),
    },
    [Shared.Abilities.Bodyguard.NOTDEADWHENGUARDANDSAVE]: {
      title: '??????????????????????????????',
      onPress: () => setBodyguardAbility(Shared.Abilities.Bodyguard.NOTDEADWHENGUARDANDSAVE),
    },
  };

  const DATA: GAME_SETTING_TYPE[] = [
    { sectionTitle: '????????????', sectionContent: villagersSettingData },
    {
      sectionTitle: '????????????',
      sectionContent: werewolfSettingData,
      normalRole: {
        title: '????????????',
        value: werewolf,
        valueIncrement: werewolfIncrease,
        valueDecrement: werewolfDecrease,
      },
    },
    {
      sectionTitle: '????????????',
      sectionContent: normalVillagerSettingData,
      normalRole: {
        title: '????????????',
        value: villager,
        valueIncrement: villagerIncrease,
        valueDecrement: villagerDecrease,
      },
    },
  ];

  const getGameConfig = () => {
    let result = '????????????x' + werewolf + ', ????????????x' + villager;
    if (seer) result += ', ?????????';
    if (witch) result += ', ??????';
    if (oldMan) result += ', ?????????';
    if (fool) result += ', ??????';
    if (hunter) result += ', ??????';
    if (bodyguard) result += ', ??????';
    if (alphawolf) result += ', ??????';
    if (mysticwolf) result += ', ??????';
    result += '.';
    return result;
  };

  return (
    <>
      <ScrollView style={styles.scrollviewContainer}>
        <View style={styles.container}>
          {DATA.map((item: GAME_SETTING_TYPE, index: number) => (
            <SettingSection key={index} data={item} />
          ))}
        </View>
        {(witch || bodyguard) && (
          <View style={styles.villagersContainer}>
            <List.Section title="????????????">
              <Divider />
              {witch && (
                <>
                  <List.Accordion
                    title={elixirAbilitySettingData[elixirAbility].title}
                    left={(props) => (
                      <Text style={{ color: props.color, paddingRight: 30 }}>??????</Text>
                    )}
                    expanded={elixirSkillExpanded}
                    onPress={() => setElixirSkillExpanded(!elixirSkillExpanded)}
                  >
                    {Object.values(elixirAbilitySettingData).map((item, index) => (
                      <List.Item
                        key={index}
                        title={item.title}
                        onPress={() => {
                          setElixirSkillExpanded(!elixirSkillExpanded);
                          item.onPress();
                        }}
                      />
                    ))}
                  </List.Accordion>
                  <Divider />

                  <List.Accordion
                    title={poisonAbilitySettingData[poisonAbility].title}
                    left={(props) => (
                      <Text style={{ color: props.color, paddingRight: 30 }}>??????</Text>
                    )}
                    expanded={poisonSkillExpanded}
                    onPress={() => setPoisonSkillExpanded(!poisonSkillExpanded)}
                  >
                    {Object.values(poisonAbilitySettingData).map((item, index) => (
                      <List.Item
                        key={index}
                        title={item.title}
                        onPress={() => {
                          setPoisonSkillExpanded(!poisonSkillExpanded);
                          item.onPress();
                        }}
                      />
                    ))}
                  </List.Accordion>

                  <Divider />
                </>
              )}

              {bodyguard && (
                <List.Accordion
                  title={bodyguardAbilitySettingData[bodyguardAbility].title}
                  left={(props) => (
                    <Text style={{ color: props.color, paddingRight: 30 }}>??????</Text>
                  )}
                  expanded={bodyGuardSkillExpanded}
                  onPress={() => setBodyGuardSkillExpanded(!bodyGuardSkillExpanded)}
                >
                  {Object.values(bodyguardAbilitySettingData).map((item, index) => (
                    <List.Item
                      key={index}
                      title={item.title}
                      onPress={() => {
                        setBodyGuardSkillExpanded(!bodyGuardSkillExpanded);
                        item.onPress();
                      }}
                    />
                  ))}
                </List.Accordion>
              )}
            </List.Section>
          </View>
        )}
        <Button
          icon="cog-transfer"
          mode="contained"
          onPress={() => {
            const maxPlayers = getMaxPlayers();
            const numWerewolves = getNumWerewolves();
            const numVillagers = maxPlayers - numWerewolves;
            console.log('maxPlayers: ', maxPlayers);
            console.log('numWerewolves: ', numWerewolves);
            console.log('numVillagers: ', numVillagers);
            if (maxPlayers <= 4) {
              Alert.alert('No enough players.');
            } else if (numVillagers < numWerewolves * 2) {
              Alert.alert('Too many werewolves.');
            } else if (numWerewolves < 1) {
              Alert.alert('No enough werewolves.');
            } else {
              showDialog();
            }
          }}
          contentStyle={{ height: 60 }}
          labelStyle={{ fontSize: 25 }}
        >
          ????????????
        </Button>
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>????????????: {getGameConfig()}</Paragraph>
            <Paragraph>????????????: {getMaxPlayers()}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button
              onPress={() => {
                const maxPlayers = getMaxPlayers();
                const numWerewolves = getNumWerewolves();
                const numVillagers = maxPlayers - numWerewolves;
                submitSettings({
                  numPlayers: maxPlayers,
                  numWerewolves: numWerewolves,
                  numVillagers: numVillagers,
                  villager: villager,
                  werewolf: werewolf,
                  ...(seer && { seer }),
                  ...(oldMan && { oldMan }),
                  ...(fool && { fool }),
                  ...(witch && { witch }),
                  ...(bodyguard && { bodyguard }),
                  ...(hunter && { hunter }),
                  ...(alphawolf && { alphawolf }),
                  ...(mysticwolf && { mysticwolf }),
                });
              }}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollviewContainer: {
    marginTop: getStatusBarHeight() + 30,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    padding: 10,
  },

  villagersContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  villagersChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#dfe5e8',
  },
  werewolfContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  werewolfChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#dfe5e8',
  },
  normalWerewolfContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#dfe5e8',
  },
});
