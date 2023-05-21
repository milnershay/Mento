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
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Swipe" component={Swipe} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
}