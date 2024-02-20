import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import NeoVersion from 'react-native-neo-version';

export default function App() {
  React.useEffect(() => {
    const func = async () => {
      const info = await NeoVersion.getUpdateInfo();
      console.log(`🐵 ------ info`, info);
      return info;
    };
    func();
  });
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
