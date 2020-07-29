import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';

export default function App() {
  const [text, setText] = useState('Initial Text')
  const [color, changeColor] = useState('text')
  return (
    <View style={styles.container}>
      <Text style={styles[color]}>{text}</Text>
      <Button title="Change Text" onPress={() => { setText('Text Changed'); changeColor('changedText') }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
  changedText: {
    color: 'orange'
  },
  container: {
    flex: 1,
    color: 'red',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
