import React, {useState, useEffect, Component } from 'react';
import {FormControl,VStack,Input,Link, Image, extendTheme, Factory, IconButton, Icon, HStack, StatusBar, View, Center, Card, Popover,Button,  NativeBaseProvider, Text, Box, Heading, Slider, Container, CheckIcon } from "native-base";
import {  TextInput, FlatList} from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { signOut } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication.ts';
import { getAuth } from 'firebase/auth';
import {where, getFirestore, collection, addDoc, onSnapshot, orderBy, query , getDocs} from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();
const chatCollection = collection(db, 'chat');


export default function Chat(props) {
  const { user } = useAuthentication();
  const { navigation } = props;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(chatCollection, orderBy('timestamp')), (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') {
      return;
    }
  
    if (!selectedUser) {
      console.log('No user selected');
      return;
    }
  
    const senderId = user.uid;
    const receiverId = selectedUser;
  
    const querySnapshot = await getDocs(
      query(chatCollection, where('senderId', 'in', [senderId, receiverId]), where('receiverId', 'in', [senderId, receiverId]))
    );
  
    if (querySnapshot.empty) {
      // No chat document found, create a new one
      const newChat = {
        participants: [senderId, receiverId],
      };
  
      try {
        const newChatDoc = await addDoc(chatCollection, newChat);
        console.log('New chat created:', newChatDoc.id);
      } catch (error) {
        console.error('Error creating chat:', error);
        return;
      }
    }
  
    const message = {
      senderId,
      receiverId,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };
  
    try {
      await addDoc(chatCollection, message);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const selectUser = (userId) => {
    setSelectedUser(userId);
    console.log(userId)
  };



  return (
    <View paddingTop={20} flex={1} alignItems="center">
      <Button.Group padding={3}>
        <Button top={30} colorScheme="primary" onPress={() => signOut(auth)}>
          Sign Out
        </Button>
      </Button.Group>

      <Text margin={5}>Select a user to message:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button margin={1} onPress={() => selectUser(item.userName)} >
            <Text>{item.userName}</Text>
          </Button>
        )}
      />

      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item }) => (
          <Text>
            {item.senderId}: {item.message}
          </Text>
        )}
      />
      <View top={0}>
        <TextInput placeholder='Write your message here' value={newMessage} onChangeText={(text) => setNewMessage(text)} />
        <Button onPress={sendMessage}>
            <Text> Send </Text>
        </Button>
      </View>
      <HStack  bg={'gray.600'} alignItems="center">
        <Button.Group width={'100%'} height={20}>
          <Button
            colorScheme="teal"
            width={'1/3'}
            onPress={() => navigation.navigate('Swipe')}>
            <Text color={'white'} fontSize={'3xl'}>
              Swipe
            </Text>
          </Button>
          <Button colorScheme="blue" width={'1/3'} onPress={() => navigation.navigate('Map')}>
            <Text color={'white'} fontSize={'3xl'}>
              Map
            </Text>
          </Button>
          <Button colorScheme="danger" width={'1/3'} onPress={() => navigation.navigate('Chat')}>
            <Text color={'white'} fontSize={'3xl'}>
              Chat
            </Text>
          </Button>
        </Button.Group>
      </HStack>
    </View>
  );
}
``
