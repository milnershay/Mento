import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Map from '../screens/HomeMap.js';
import Chat from '../screens/Chat.js';
import Swipe from '../screens/Swipe.js';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator

      >
        <Stack.Screen  name="Map" component={Map} options={{headerShown: false}}  />
        <Stack.Screen name="Chat" component={Chat} options={{headerShown: true}}/>
        <Stack.Screen name="Swipe" component={Swipe} options={{headerShown: false}}/>
      </Stack.Navigator> 
    </NavigationContainer>
  );
}