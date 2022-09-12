import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export const USERNAME_INPUT_TEST_ID = 'LoginScreen.usernameInput';
export const PASSWORD_INPUT_TEST_ID = 'LoginScreen.passwordInput';
export const LOGIN_BUTTON_TEST_ID = 'LoginScreen.loginButton';
export const INVALID_USERNAME_ERROR = 'Invalid username.';
export const INVALID_PASSWORD_ERROR = 'Invalid password.';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation();

  const onLoginButtonClick = () => {
    let isValid = true;

    if (username !== 'test') {
      setEmailError(INVALID_USERNAME_ERROR);
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password !== 'test') {
      setPasswordError(INVALID_PASSWORD_ERROR);
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          navigation.navigate('HomeScreen');
        })
        .catch(error => {
          console.log('error:', error);
        });
    }
  };

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 32,
        }}>
        <Text style={{fontSize: 28, fontWeight: 'bold', color: 'black'}}>
          Login
        </Text>
      </View>

      <View style={{marginTop: 42, paddingHorizontal: 24}}>
        <TextInput
          testID={USERNAME_INPUT_TEST_ID}
          placeholder="Email"
          style={{
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            fontSize: 16,
            color: 'black',
          }}
          onChangeText={text => setUsername(text)}
        />
        {!!emailError && <Text>{emailError}</Text>}

        <TextInput
          testID={PASSWORD_INPUT_TEST_ID}
          placeholder="Password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            fontSize: 16,
            color: 'black',
            marginTop: 12,
          }}
          onChangeText={text => setPassword(text)}
        />
        {!!passwordError && <Text>{passwordError}</Text>}

        <View style={{marginTop: 24}}>
          <Button
            testID={LOGIN_BUTTON_TEST_ID}
            title="Login"
            onPress={onLoginButtonClick}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
