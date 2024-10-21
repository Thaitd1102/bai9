import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [storedPhoneNumber, setStoredPhoneNumber] = useState(null);

  useEffect(() => {
    const getStoredPhoneNumber = async () => {
      try {
        const value = await AsyncStorage.getItem('phoneNumber');
        if (value !== null) {
          setStoredPhoneNumber(value);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getStoredPhoneNumber();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('phoneNumber');
      setStoredPhoneNumber(null);
      Alert.alert('Logged out successfully!');
      navigation.navigate('Login');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Welcome, {storedPhoneNumber}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e3f2fd', // Màu nền xanh nhạt
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
    color: '#0d47a1', // Màu văn bản xanh đậm
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#d32f2f', // Màu đỏ cho nút đăng xuất
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  logoutButtonText: {
    color: '#ffffff', // Màu chữ trắng
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
