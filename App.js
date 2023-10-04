import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { FlatList } from 'react-native';
import { getFirestore, setDoc, doc, collection, addDoc, firestore, query,onSnapshot} from 'firebase/firestore'
import database from 'firebase/firestore';
import { List, Appbar, TextInput, Button as PaperButton } from 'react-native-paper';
import Todo from './Todo';

const firebaseConfig = {
  apiKey: "AIzaSyCbfPuPqy7pa8nhhhhtLt7pCQx3VGOc5qg",
  authDomain: "ktgk-dc13b.firebaseapp.com",
  projectId: "ktgk-dc13b",
  storageBucket: "ktgk-dc13b.appspot.com",
  messagingSenderId: "782280285325",
  appId: "1:782280285325:web:c108a2a8c2512ee63996c4",
  measurementId: "G-2D7YJZWFBG"
};

initializeApp(firebaseConfig);

function App() {

  const [todo, setTodo] = React.useState('');
  const [ loading, setLoading ] = React.useState(true);
  const [ todos, setTodos ] = React.useState([]);
  const db = getFirestore();
  const ref = collection(db,'todos')
  async function addTodo() {
    await ref.addDoc({
      title: todo,
      complete: false,
    });
    setTodo(''); 
  }
  React.useEffect(() => {
    const unscribe = onSnapshot(ref, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });

    return () => unscribe()
  });

  if (loading) {
    return null; 
  }

  return (
    <View style={{flex:1}}>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <FlatList 
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
      />
      <TextInput label={'New Todo'} value={todo} onChangeText={(text) => setTodo(text)} />
      <Button onPress={addTodo}>Add TODO</Button>
    </View>
  );
}

export default App;