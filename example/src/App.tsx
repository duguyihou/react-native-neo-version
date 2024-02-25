import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { useNeoVersionCheck } from '../../src/index.android';

export default function App() {
  useNeoVersionCheck();

  return (
    <View style={styles.container}>
      <Text>React Native Neo Version</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
