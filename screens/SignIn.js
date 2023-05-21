import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Center, Box, Heading, VStack, FormControl } from 'native-base';
const auth = getAuth();




const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })


  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',

      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }


  const [passwordShown, setPasswordShown] = useState(false);



  return (
    <View style={styles.container}>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

        <View style={styles.controls}>

            <VStack space={3} mt="5">
            <FormControl width={300}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              type="email"
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
              secureTextEntry={true}
              onChangeText={(text) => setValue({ ...value, password: text })}
              leftIcon={<Icon
                name='key'
                size={16}
              />} 
              
          />

        </FormControl>

        <Button title="Sign in"  onPress={signIn} />

        </VStack>

      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
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
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});


export default SignInScreen;