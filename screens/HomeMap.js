import React, {useState, useEffect, Component } from 'react';
import {FormControl,VStack,Input,Link, Image, extendTheme, Factory, IconButton, Icon, HStack, StatusBar, View, Center, Card, Popover,Button,  NativeBaseProvider, Text, Box, Heading, Slider, Container, CheckIcon } from "native-base";
import { StyleSheet } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { signOut } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication.ts';
import { getAuth } from 'firebase/auth';
const auth = getAuth();


export default function Map(props){
    const {user} = useAuthentication();
    const {navigation} = props
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

    return <Center width={'100%'} marginTop={0}>

        <View marginTop={0} width={"100%"} height={"100%"}>
            
            <MapView style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true} >

            <Marker
                coordinate={{latitude: 32.135831,
                    longitude: 34.838037 }}
                pinColor='purple'
            >

            </Marker>

            <Circle
                radius={20}
                title='test'
                description='testy'
                center={{latitude: 32.135831,
                    longitude: 34.838037 }}
                strokeColor='purple'
            >
            </Circle>

            </MapView>
            <Button.Group padding={3}>
                <Button colorScheme="primary"
                    onPress={() => signOut(auth)}
                >Sign Out</Button>
            </Button.Group>
            
        </View>


        
    </Center>

    }




const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
      marginTop: 0,
    },
  });