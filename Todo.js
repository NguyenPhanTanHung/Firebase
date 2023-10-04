import React from 'react';
import { getFirestore, collection, doc, updateDoc, addDoc } from 'firebase/firestore';
import { List } from 'react-native-paper';

function Todo({ id, title, complete }) {
    const db = getFirestore();
    const todoRef = doc(collection(db, 'todos'), id);

    async function toggleComplete() {
        await addDoc(todoRef, {
            complete: !complete,
        });
    }

    return (
        <List.Item
            title={title}
            onPress={() => toggleComplete()}
            left={props => (
                <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
            )}
        />
    );
}

export default Todo;