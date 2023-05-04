import { StyleSheet } from 'react-native';
import React from "react";
import { Factory, IconButton, Icon,AntDesign, HStack, StatusBar, Header, View, Center, Card, Popover,Button,  NativeBaseProvider, Text, Box, Heading, Slider, Container, CheckIcon } from "native-base";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 




export default function App() {

  return (
    <NativeBaseProvider>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="pink.500">
        <HStack  space="3" alignItems="center"  px="1" py="3"
       justifyContent={"space-between"} w="100%">
        <HStack>
        <IconButton  icon={<Icon size="md" as={MaterialIcons} name="menu" color="white" />}
          onPress={()=>{
          console.log('menu button pressed')
          }}
        />
        <Text color={"white"}  fontSize="24" fontWeight={"bold"}>Mento</Text>
        </HStack>
        <HStack>
          <IconButton
            icon={<Icon size="md" as={MaterialIcons} name="favorite" color="white" />}
            onPress={()=>{
            console.log('hello')
            }}
            
          />
          
          <IconButton
            icon={<Icon size="md" as={MaterialIcons} name="search" color="white" />}
            onPress={()=>{
            console.log('hello')
            }}
            
          />
          
          <IconButton
            icon={<Icon size="md" as={MaterialIcons} name="more-vert" color="white" />}
            onPress={()=>{
            console.log('hello')
            }}
            
          />
          
          
          
          
        </HStack>     
        </HStack>
      </Box>
      
      
      
    </NativeBaseProvider>
  ); 

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


