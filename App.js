import { StyleSheet} from 'react-native';
import React from "react";
import {Image, extendTheme, Factory, IconButton, Icon,AntDesign, HStack, StatusBar, Header, View, Center, Card, Popover,Button,  NativeBaseProvider, Text, Box, Heading, Slider, Container, CheckIcon } from "native-base";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import {login} from './views/login.js'
import { NavigationContainer } from "@react-navigation/native";


export default function App() {

  return (
    <NativeBaseProvider>
        <login/>
    </NativeBaseProvider>
  ); 

}


