import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      console.log(username)
      const res = await fetch("http://192.168.1.6:3000/api/auth/login",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({username,password})
      })

      const data = await res.json();
      console.log("whole data:",data);

      const {user} = data
      console.log(user);

      if(res.status == 201){
        await AsyncStorage.setItem('user',JSON.stringify({username:user.username,email:user.email,image:user.image}))
        Alert.alert('Login Successfull','Welcom Back...........');
        navigation.navigate('Home')
      }
      else if(res.status == 400){
        Alert.alert('Invalid Credentials',"Check your username or password");
      }
      else{
        Alert.alert('Error',"Sorry for Inconvience");
      }
    } else {
      Alert.alert('Error', 'Please fill in both fields');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          
          onChangeText={setUsername}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable style={{flexDirection:'row',justifyContent:'center'}} onPress={()=>{navigation.navigate('Signup')}}>
          <Text >Already have an account?</Text>
          <Text style={styles.forgotPassword}>SignUp</Text>
        </Pressable>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0fa',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    height: 48,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9fafb',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassword: {
    color: '#2563eb',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;