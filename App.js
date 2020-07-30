import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, BackHandler, TextInput, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native';

export default function App() {
  const [task, setTask] = useState('')
  const [listOfTasks, setListOfTasks] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  const handleInputChange = textValue => {
    setTask(textValue)
  }

  const handleAdd = type => {
    if (type === 'add') {
      setListOfTasks(() => ([
        ...listOfTasks,
        {
          key: (Math.random()).toString(),
          value: task
        }
      ]))
    }
    setTask('')
    setModalVisible(false)
  }

  const handleDelete = deleteItemKey => {
    console.log('cominggggggg')
    setListOfTasks(() => {
      return listOfTasks.filter(task => task.key !== deleteItemKey)
    })
  }
  return (
    <View style={styles.container}>
      <Button title="Add new Goal" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.inputContainer}>
          <TextInput value={task} onChangeText={handleInputChange} placeholder="Type your task" style={styles.textInput} />
          <View style={styles.submitButton}>
            <Button title="Add" onPress={() => handleAdd('add')} />
            <Button title="Cancel" color="red" onPress={() => handleAdd('cancel')} />
          </View>
        </View>
      </Modal>
      {/** 
       * FlatList - used for perfomance scrolling like if there are more than 100 items for eg: it will lazyload kind of
       * 
      */}
      {listOfTasks.length > 0 && (
        <FlatList
          data={listOfTasks}
          renderItem={itemDetails => (
            <TouchableOpacity onPress={() => handleDelete(itemDetails.item.key)}>
              <View style={styles.listItem}>
                <Text>
                  {itemDetails.item.value}
                </Text>
              </View>
            </TouchableOpacity>
          )}


        />
        // <ScrollView style={styles.resultContainer}>
        //   {listOfTasks.map((taskList, index) => (
        //     <View key={index} style={styles.listItem}>
        //       <Text>
        //         {taskList}
        //       </Text>
        //     </View>
        //   ))}
        // </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    borderColor: 'black',
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#ccc'
  },
  container: {
    padding: 50,
    width: "100%",
    flexDirection: 'column-reverse',
    position: 'absolute',
    bottom: 0,
  },
  inputContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    marginVertical: 20,
    width: "40%",
    justifyContent: 'space-between'
  },
  textInput: {
    width: '80%',
    borderColor: 'orange',
    borderWidth: 2,
    padding: 10,
    marginBottom: 10
  },
  resultContainer: {
    flexDirection: 'column'
  }
});
