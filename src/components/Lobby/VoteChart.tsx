import React from 'react';
import { Colors } from 'react-native-paper';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryPortal,
  VictoryStack,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory-native';

const VoteChart = () => {
  const players = {
    1: { label: 'Helen', fill: 'red' },
    2: { label: 'Kurt', fill: '' },
    3: { label: 'Jimmy', fill: '' },
    4: { label: 'Jack', fill: '' },
    5: { label: 'Stella', fill: '' },
    6: { label: 'Terry', fill: '' },
    7: { label: 'Jery', fill: '' },
    8: { label: 'Yao', fill: '' },
  };

  const maxPlayers = 8;

  const voteResultCopy = [
    { x: 1, 2: 1, 3: 1, 5: 1, 7: 1 },
    { x: 2, 1: 1, 4: 1, 8: 1 },
    { x: 3, 6: 1 },
  ];

  const buildVoteResultChartData = () => {
    voteResultCopy.map((v, i) => {
      return { label: i + 1 + '', x: 2, y: 1 };
    });
  };

  const voteResultData = [
    { label: '1', x: 2, y: 1 },
    { label: '2', x: 1, y: 1 },
    { label: '3', x: 1, y: 1 },
    { label: '4', x: 2, y: 1 },
    { label: '5', x: 1, y: 1 },
    { label: '6', x: 3, y: 1 },
    { label: '7', x: 1, y: 1 },
    { label: '8', x: 2, y: 1 },
  ];

  const votedPlayers = {
    1: 'Helen',
    2: 'Kurt',
    3: 'Jimmy',
  };

  const voteResult = [
    { x: 1, 1: 0, 2: 1, 3: 1, 4: 0, 5: 1, 6: 0, 7: 1, 8: 0 },
    { x: 2, 1: 1, 2: 0, 3: 0, 4: 1, 5: 0, 6: 0, 7: 0, 8: 1 },
    { x: 3, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 0, 8: 0 },
  ];

  return (
    <VictoryChart domainPadding={{ y: 10 }} polar innerRadius={40} theme={VictoryTheme.material}>
      <VictoryPolarAxis
        dependentAxis
        labelPlacement="vertical"
        style={{ axis: { stroke: 'none' } }}
        tickFormat={() => ''}
      />
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickValues={Object.keys(votedPlayers).map((k) => +k)}
        tickFormat={Object.values(votedPlayers)}
      />
      <VictoryStack
        colorScale={[
          Colors.amber700,
          Colors.lime500,
          Colors.blue500,
          Colors.brown300,
          Colors.cyan500,
          Colors.deepOrange500,
          Colors.deepPurple200,
          Colors.green700,
        ]}
        style={{
          data: { width: 20 },
          labels: { padding: -10 },
        }}
        // labelComponent={
        //     <VictoryPortal>
        //       <VictoryLabel/>
        //     </VictoryPortal>
        //   }
      >
        {voteResultData.map((k, i) => (
          <VictoryBar
            style={{ data: { width: 40 } }}
            data={[k]}
            key={i}
            // labels={() => ''}
            // labelComponent={<VictoryLabel renderInPortal />}
          />
        ))}

        {/* <VictoryBar data={voteResult}/> */}
        {/* <VictoryBar
          data={[
            { x: 1, y: 1, label: 'C' },
            { x: 2, y: 1, label: 'C' },
            { x: 3, y: 1, label: 'C' },
          ]}
        />
        <VictoryBar
          data={[
            { x: 1, y: 1, label: 'B' },
            { x: 2, y: 1, label: 'B' },
            { x: 3, y: 1, label: 'B' },
          ]}
        />
        <VictoryBar
          data={[
            { x: 1, y: 1, label: 'A' },
            { x: 2, y: 0, label: 'A' },
            { x: 3, y: 1, label: 'A' },
            //   { x: 12, y: 1, label: 'A' },
          ]}
        /> */}
      </VictoryStack>
    </VictoryChart>
  );
};

export default VoteChart;
