import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = async () => {
    // Validate phone number format
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid phone number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      Alert.alert('Logged in successfully!');
      setPhoneNumber('');
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Please enter your phone number to login</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter phone number"
        keyboardType="numeric"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle: styles.header, headerTintColor: '#fff' }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50,
    borderColor: '#6200ea',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    width: '80%',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#6200ea',
  },
});

export default App;
