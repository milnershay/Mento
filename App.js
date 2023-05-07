import { StyleSheet, useColorScheme} from 'react-native';
import React from "react";
import {Image, extendTheme, Factory, IconButton, Icon,AntDesign, HStack, StatusBar, Header, View, Center, Card, Popover,Button,  NativeBaseProvider, Text, Box, Heading, Slider, Container, CheckIcon } from "native-base";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import {Login} from './views/login.js'
import { NavigationContainer, DefaultTheme , DarkTheme, useTheme} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Signup } from './views/signup.js';

const Stack = createNativeStackNavigator();


export default function App() {
  const scheme = useColorScheme()

  return (
    <NativeBaseProvider>
      <NavigationContainer theme={scheme ==='dark' ? DarkTheme : DefaultTheme}>
        <MyStack/>
      </NavigationContainer>
    </NativeBaseProvider>
  ); 

}

function MyStack(){
  return (
    <Stack.Navigator
    initialRouteName='Login'
    screenOptions={{
      headerTintColor: 'dea',
      headerBackVisible: false,
    }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: 'Signup',
        }}
      />
    </Stack.Navigator>
  )
}

