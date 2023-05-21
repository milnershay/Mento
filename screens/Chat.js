import React, {useState, useEffect, Component, useLayoutEffect, useCallback } from 'react';
import {  TextInput, FlatList, TouchableOpacity} from 'react-native';
import { signOut } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication.ts';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query , getDocs} from 'firebase/firestore';
import { GiftedChat } from "react-native-gifted-chat"
import {AntDesign} from '@expo/vector-icons'
import { Image } from 'react-native';
import AvatarImage from '../assets/images/yogever.jpg';


const auth = getAuth();
const db = getFirestore();


export default function Chat(props) {
  const { user } = useAuthentication();
  const {navigation} = props
  const [messages, setMessages] = useState([])
  const onSignOut = () => {
    signOut(auth).catch(error => console.log(error));
  };

  const renderAvatar = (props) => {
    return <Image source={AvatarImage} style={{ width: 40, height: 40, borderRadius: 20 }} />;
  };

  useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity
            style={{
                marginRight: 10
            }}
            onPress={onSignOut}
            >
                <AntDesign name='logout' size={24}  style={{marginRight: 10}} />
            </TouchableOpacity>
        )
    })
   
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(db, 'chats');
    const q = query(collectionRef, ref => ref.orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
        console.log('snapshot');
        setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
            .sort((a, b) => a.createdAt - b.createdAt)
            .reverse()
        )
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    const {_id, createdAt, text, user} = messages[0];
    addDoc(collection(db, 'chats'), {
        _id,
        createdAt,
        text,
        user
    });
  }, [])

  return (
    <GiftedChat  
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: auth?.currentUser?.email,
        }}
        renderAvatar={renderAvatar}
        messagesContainerStyle={{
            backgroundColor: '#fff'
        }}
    />
  );
}

