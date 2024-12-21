// components/LoginForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

interface LoginFormProps {
  navigation: any; // Assuming you are passing navigation prop from the screen
}

const LoginForm: React.FC<LoginFormProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      // Save token to localStorage or AsyncStorage
      localStorage.setItem('token', response.data.token);
      setLoading(false);
      navigation.replace('Home'); // Navigate to the home screen on successful login
    } catch (err) {
      setLoading(false);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Image component to display the logo */}
      <Image
        source={require('@/assets/loginimg.jpg')}  // Update this path to your logo image
        style={styles.logo}
        resizeMode="contain"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 250, // Adjust the size of the logo as needed
    height: 250,
    marginBottom: 30, // Space below the logo
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginForm;
