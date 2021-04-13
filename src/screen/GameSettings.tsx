import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Chip, Divider, IconButton, TextInput, List, Button } from 'react-native-paper';
import * as Shared from '../common/Shared';



function Item({ title }: { title: string }) {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
};



export default function GameSettings({ navigation }) {
    //villagers state setting
    const [villager, setVillager] = useState(0);
    const [oldMan, setOldMan] = useState(false);

    const [seer, setSeer] = useState(false);
    const [fool, setFool] = useState(false);
    const [hunter, setHunter] = useState(false);
    const [bodyguard, setBodyguard] = useState(false);
    const [witch, setWitch] = useState(false);

    //werewolf state setting
    const [werewolf, setWerewolf] = useState(0);
    const [alphawolf, setAlphawolf] = useState(false);
    const [mysticwolf, setMysticwolf] = useState(false);

    //skills state setting
    const [elixirSkill, setElixirSkill] = useState(Shared.Skills.Elixir.CANSAVEYOURSELF);
    const [elixirSkillExpanded, setElixirSkillExpanded] = useState(false);
    const [poisonSkill, setPoisonSkill] = useState(Shared.Skills.Poison.CANNOTUSEWITHELIXIR);
    const [poisonSkillExpanded, setPoisonSkillExpanded] = useState(false);
    const [bodyguardSkill, setBodyguardSkill] = useState(Shared.Skills.Bodyguard.DEADWHENGUARDANDSAVE);
    const [bodyGuardSkillExpanded, setBodyGuardSkillExpanded] = useState(false);


    const [count, setCount] = useState(0);





    const DATA = [
        {
            title: '神民配置',
            data: ['预言家', '白痴', '猎人', '守卫', '女巫'],
        },
        {
            title: '狼人配置',
            data: ['头狼', '隐狼', '普通狼人'],
        },
        {
            title: '村民配置',
            data: [],
        },
        {
            title: '技能配置',
            data: [],
        }
    ];
    type settingType = {
        title: string,
        onPress: () => void,
        selected: boolean
    };
    const villagersSettingData: settingType[] = [
        {
            title: '预言家',
            onPress: () => { setSeer(!seer) },
            selected: seer,
        },
        {
            title: '白痴',
            onPress: () => { setFool(!fool) },
            selected: fool,
        },
        {
            title: '猎人',
            onPress: () => { setHunter(!hunter) },
            selected: hunter,
        },
        {
            title: '守卫',
            onPress: () => { setBodyguard(!bodyguard) },
            selected: bodyguard,
        },
        {
            title: '女巫',
            onPress: () => { setWitch(!witch) },
            selected: witch,
        },
    ];


    const werewolfSettingData: settingType[] = [
        {
            title: '狼王',
            onPress: () => { setAlphawolf(!alphawolf) },
            selected: alphawolf,
        },
        {
            title: '隐狼',
            onPress: () => { setMysticwolf(!mysticwolf) },
            selected: mysticwolf,
        },
    ];

    const normalVillagerSettingData: settingType[] = [
        {
            title: '老流氓',
            onPress: () => { setOldMan(!oldMan) },
            selected: oldMan,
        }
    ];

    const elixirSkillSettingData = [
        {
            title: '不可以自救',
            onPress: () => { setElixirSkill(Shared.Skills.Elixir.CANNOTSAVEYOURSELF) }
        },
        {
            title: '可以自救',
            onPress: () => { setElixirSkill(Shared.Skills.Elixir.CANSAVEYOURSELF) }
        },
        {
            title: '只可以在第一晚自救',
            onPress: () => { setElixirSkill(Shared.Skills.Elixir.CANSAVEYOURSELFONLY1STNIGHT) }
        }
    ];

    const elixirSkillTitle = {
        [Shared.Skills.Elixir.CANNOTSAVEYOURSELF]: '不可以自救',
        [Shared.Skills.Elixir.CANSAVEYOURSELF]: '可以自救',
        [Shared.Skills.Elixir.CANSAVEYOURSELFONLY1STNIGHT]: '只可以在第一晚自救'
    };

    const poisonSkillSettingData = [
        {
            title: '不可与解药同一夜使用',
            onPress: () => { setPoisonSkill(Shared.Skills.Poison.CANNOTUSEWITHELIXIR) }
        },
        {
            title: '可以与解药同一夜使用',
            onPress: () => { setPoisonSkill(Shared.Skills.Poison.CANUSEWITHELIXIR) }
        }
    ];

    const poisonSkillTitle = {
        [Shared.Skills.Poison.CANNOTUSEWITHELIXIR]: '不可与解药同一夜使用',
        [Shared.Skills.Poison.CANUSEWITHELIXIR]: '可以与解药同一夜使用',
    };

    const bodyguardSkillSettingData = [
        {
            title: '同时被守被救算死亡',
            onPress: () => { setBodyguardSkill(Shared.Skills.Bodyguard.DEADWHENGUARDANDSAVE) }
        },
        {
            title: '同时被守被救不算死亡',
            onPress: () => { setBodyguardSkill(Shared.Skills.Bodyguard.NOTDEADWHENGUARDANDSAVE) }
        }
    ];

    const bodyguardSkillTitle = {
        [Shared.Skills.Bodyguard.DEADWHENGUARDANDSAVE]: '同时被守被救算死亡',
        [Shared.Skills.Bodyguard.NOTDEADWHENGUARDANDSAVE]: '同时被守被救不算死亡',
    };



    return (
        <ScrollView>
            <View style={styles.villagersContainer}>
                <Text style={{ padding: 10 }}>神民配置</Text>
                <View style={styles.villagersChipContainer}>
                    {
                        villagersSettingData.map((item, index) => <Chip key={index} icon={item.selected ? "handshake" : "hand"} mode='outlined' onPress={item.onPress} selected={item.selected} style={{ marginHorizontal: 5, marginVertical: 10 }} >{item.title}</Chip>)
                    }
                </View>
            </View>
            <View style={styles.werewolfContainer}>
                <Text style={{ padding: 10 }}>狼人配置</Text>
                <View style={styles.werewolfChipContainer}>
                    {
                        werewolfSettingData.map((item, index) => <Chip key={index} icon={item.selected ? "handshake" : "hand"} mode='outlined' onPress={item.onPress} selected={item.selected} style={{ marginHorizontal: 5, marginVertical: 10 }} >{item.title}</Chip>)
                    }
                </View>
                <Divider />
                <View style={styles.normalWerewolfContainer}>
                    <Text style={{ alignSelf: 'center', paddingHorizontal: 20, fontSize: 15 }}>普通狼人</Text>
                    <IconButton
                        icon="minus"
                        size={20}
                        onPress={() => setWerewolf(werewolf != 0 ? (werewolf - 1) : 0)}
                    />
                    <TextInput
                        disabled={true}
                        value={werewolf + ''}
                        style={{ height: 20, backgroundColor: "#dfe5e8", alignSelf: 'center' }}
                    />
                    <IconButton
                        icon="plus"
                        size={20}
                        onPress={() => setWerewolf(werewolf + 1)}
                    />
                </View>
            </View>

            <View style={styles.villagersContainer}>
                <Text style={{ padding: 10 }}>村民配置</Text>
                <View style={styles.villagersChipContainer}>
                    {
                        normalVillagerSettingData.map((item, index) => <Chip key={index} icon={item.selected ? "handshake" : "hand"} mode='outlined' onPress={item.onPress} selected={item.selected} style={{ marginHorizontal: 5, marginVertical: 10 }} >{item.title}</Chip>)
                    }
                </View>
                <Divider />
                <View style={styles.normalWerewolfContainer}>
                    <Text style={{ alignSelf: 'center', paddingHorizontal: 20, fontSize: 15 }}>普通村民</Text>
                    <IconButton
                        icon="minus"
                        size={20}
                        onPress={() => setVillager(villager != 0 ? (villager - 1) : 0)}
                    />
                    <TextInput
                        disabled={true}
                        value={villager + ''}
                        style={{ height: 20, backgroundColor: "#dfe5e8", alignSelf: 'center' }}
                    />
                    <IconButton
                        icon="plus"
                        size={20}
                        onPress={() => setVillager(villager + 1)}
                    />
                </View>
            </View>

            <View style={styles.villagersContainer}>
                <List.Section title="技能配置">
                    <Divider />
                    <List.Accordion
                        title={elixirSkillTitle[elixirSkill]}
                        left={props => <Text style={{ color: props.color, paddingRight: 30 }}>解药</Text>}
                        expanded={elixirSkillExpanded}
                        onPress={() => setElixirSkillExpanded(!elixirSkillExpanded)}>
                        {
                            elixirSkillSettingData.map((item, index) => <List.Item key={index} title={item.title} onPress={() => { setElixirSkillExpanded(!elixirSkillExpanded); item.onPress() }} />)
                        }
                    </List.Accordion>
                    <Divider />

                    <List.Accordion
                        title={poisonSkillTitle[poisonSkill]}
                        left={props => <Text style={{ color: props.color, paddingRight: 30 }}>毒药</Text>}
                        expanded={poisonSkillExpanded}
                        onPress={() => setPoisonSkillExpanded(!poisonSkillExpanded)}>
                        {
                            poisonSkillSettingData.map((item, index) => <List.Item key={index} title={item.title} onPress={() => { setPoisonSkillExpanded(!poisonSkillExpanded); item.onPress() }} />)
                        }
                    </List.Accordion>

                    <Divider />
                    <List.Accordion
                        title={bodyguardSkillTitle[bodyguardSkill]}
                        left={props => <Text style={{ color: props.color, paddingRight: 30 }}>守卫</Text>}
                        expanded={bodyGuardSkillExpanded}
                        onPress={() => setBodyGuardSkillExpanded(!bodyGuardSkillExpanded)}>
                        {
                            bodyguardSkillSettingData.map((item, index) => <List.Item key={index} title={item.title} onPress={() => { setBodyGuardSkillExpanded(!bodyGuardSkillExpanded); item.onPress() }} />)
                        }
                    </List.Accordion>

                </List.Section>
            </View>

            <Button icon="cog-transfer" mode="contained" onPress={() => navigation.navigate('Lobby')} contentStyle={{ height: 60 }} labelStyle={{ fontSize: 25 }}>
                完成配置
            </Button>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    villagersContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    villagersChipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#dfe5e8",
    },
    werewolfContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    werewolfChipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#dfe5e8",
    },
    normalWerewolfContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#dfe5e8",
    },


    top: {
        marginTop: 10,
        backgroundColor: "#dfe5e8",
    },
    middle: {
        // margin: 10,
        backgroundColor: "#dfe5e8",
    },
    bottom: {
        // margin: 10,
        backgroundColor: "#dfe5e8",
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
});