import React, {useState, useEffect, Component } from 'react';
import {FormControl,VStack,Input,Link, Image, extendTheme, Factory, IconButton, Icon, HStack, StatusBar, View, Center, Card, Popover,Button,  NativeBaseProvider, Text, Box, Heading, Slider, Container, CheckIcon } from "native-base";
import { StyleSheet } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { signOut } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication.ts';
import { getAuth } from 'firebase/auth';
import { get, getDatabase } from 'firebase/database';
import { ref, set, up, onValue } from 'firebase/database';

const auth = getAuth();
const db = getDatabase();


export default function Swipe(props){
    const {user} = useAuthentication();
    const {navigation} = props


    return(

        <View paddingTop={20} flex={"1"} alignItems={"center"}>
            <Button.Group padding={3}>
                <Button top={30} colorScheme="primary"
                    onPress={() => signOut(auth)}
                >Sign Out
                </Button>
            </Button.Group>
            <Text margin={10} fontSize="5xl">Swipe page</Text>

            <HStack marginTop={'110%'} bg={"gray.600"}alignItems="center">
                <Button.Group width={"100%"} height={20}>
                    <Button colorScheme="teal" width={"1/3"} 
                        onPress={() => navigation.navigate('Swipe')}>
                            <Text color={"white"} fontSize={"3xl"}>Swipe</Text>
                    </Button>
                    <Button colorScheme="blue" width={"1/3"}
                    onPress={()=> navigation.navigate('Map')}>
                        <Text color={"white"} fontSize={"3xl"}>Map</Text>
                        </Button>
                    <Button colorScheme="danger" width={"1/3"}
                    onPress={()=> navigation.navigate('Chat')}>
                        <Text color={"white"} fontSize={"3xl"}>Chat</Text>
                        </Button>
                </Button.Group>
            </HStack>
        </View>
        
    )
}