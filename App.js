import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Keyboard, ToastAndroid } from 'react-native';
import FlexibleGrid from './components/FlexibleGrid';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if (task) {
      setTaskItems([...taskItems, task]);
      setTask('');
      Keyboard.dismiss();
    }
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskWrap}>
        <Text style={styles.listTitle}>To Do List</Text>
        <ScrollView style={styles.items}>
          {
            taskItems.map((item, i) => {
              return (
                
                <TouchableOpacity key={i} onPress={() => completeTask(i)}>
                <FlexibleGrid text={item} /> 
                </TouchableOpacity>

              )
            })
          }
        </ScrollView>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrap}
      >
        <TextInput 
          style={styles.input} 
          placeholder={'Write your Task'} 
          value={task} 
          onChangeText={text => setTask(text)} 
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrap}>
            <Text style={styles.addTask}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FAFD',
  },
  taskWrap: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrap: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 280,
  },
  addWrap: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  addTask: {
    fontSize: 24,
  },
  taskItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  taskText: {
    fontSize: 16,
  },
});
