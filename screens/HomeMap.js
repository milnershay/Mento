import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { signOut } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth } from 'firebase/auth';
import { get, getDatabase } from 'firebase/database';
import { ref, set, update, onValue } from 'firebase/database';
import { Button, Text, View, VStack, HStack } from 'native-base';

const auth = getAuth();
const db = getDatabase();


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Map(props){
    const {user} = useAuthentication();
    const {navigation} = props
    const [userLocations, setUserLocations] = useState([]);

    useEffect(() => {
      if (user) {
        const userId = user.uid;
        const geolocationsRef = ref(db, 'geolocations');
  
        const startLocationTracking = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
  
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
  
          const locationListener = await Location.watchPositionAsync(
            { distanceInterval: 10 },
            (location) => {
              update(geolocationsRef, { [userId]: location });
              console.log('Updated location');
            }
          );
  
          return async () => {
            if (locationListener) {
              await locationListener.remove();
            }
          };
        };
  
        startLocationTracking();
      }
  
      const locationsRef = ref(db, 'geolocations');
  
      const onDataChange = (snapshot) => {
        const data = snapshot.val();
  
        if (data) {
          const locations = Object.entries(data).map(([userId, location]) => ({
            userId,
            location,
          }));
  
          setUserLocations(locations);
        } else {
          setUserLocations([]);
        }
      };
  
      onValue(locationsRef, onDataChange);
  
      // Cleanup the event listener when the component is unmounted
      return () => {
        onValue(locationsRef, onDataChange);
      };
    }, []);

    return(

        <View marginTop={0} width={"100%"} height={"70%"}>
            <VStack>
            <MapView style={styles.map}
            customMapStyle={mapStyle}
            followsUserLocation={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsPointsOfInterest={false}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            rotateEnabled={true}
            minZoomLevel={12}
            maxZoomLevel={17}
            provider='google'
            >
              {
              userLocations.map(({ userId, location }) => (
                <Marker
                  key={userId}
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  pinColor={getRandomColor()}
                />
              ))}
            </MapView>
            <Button.Group padding={3}>
                <Button top={30} colorScheme="primary"
                    onPress={() => signOut(auth)}
                >Sign Out
                </Button>
            </Button.Group>
            <HStack marginTop={'170%'} bg={"gray.600"}alignItems="center">
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
        </VStack>
        </View>
    )
        

}




const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
      marginTop: 0,
    },
  });

 const mapStyle=
 [
  {
      "featureType": "all",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "hue": "#ff0000"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "poi.attraction",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.government",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.medical",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.place_of_worship",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.school",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.sports_complex",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  }
]