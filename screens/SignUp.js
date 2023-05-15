import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Center, Box, Heading, VStack, FormControl } from 'native-base';
const auth = getAuth();

const SignUpScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  });

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

        <View style={styles.controls}>

          <VStack space={3} mt="5">
          <FormControl width={300}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            leftIcon={<Icon
              name='envelope'
              size={16}
            />}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password"
                value={value.password}
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
                leftIcon={<Icon
                  name='key'
                  size={16}
          />}
          
          />
        </FormControl>

        <Button mt="5" colorScheme="indigo" onPress={signUp} title={"Sign Up"}/>

      </VStack>
      </View>
    </View>


    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignUpScreen;