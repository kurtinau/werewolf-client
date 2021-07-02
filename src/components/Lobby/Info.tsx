import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Subheading, ToggleButton, Button } from 'react-native-paper';
import VoteChart from './VoteChart';

const Info = ()  => {
  const [value, setValue] = useState('1');
  return (
    <View style={styles.infoView}>
      {/* <Headline>First Night</Headline>
      <Subheading>Safe and Sound</Subheading>
      <Headline>First DayTime</Headline>
      <Subheading>Vote Result</Subheading> */}
      <ToggleButton.Row onValueChange={(value) => setValue(value)} value={value}>
        {/* <Button mode="outlined" onPress={() => console.log('Pressed')}>
          press
        </Button> */}
        <ToggleButton icon="numeric-1" value="1" />
        <ToggleButton icon="numeric-2" value="2" />
      </ToggleButton.Row>
      <VoteChart />
    </View>
  );
}

export default Info;

const styles = StyleSheet.create({
  infoView: {
    // flex: 5,
    marginTop: 10,
  },
});
