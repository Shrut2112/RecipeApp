import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [originalUsername, setOriginalUsername] = useState(''); // New state for original username
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        if (data) {
          const parsedData = JSON.parse(data);
          setUsername(parsedData.username || '');
          setOriginalUsername(parsedData.username || ''); // Store original username
          setEmail(parsedData.email || '');
          setImage(parsedData.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
        } else {
          Alert.alert('Error', 'No user data found');
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
        Alert.alert('Error', 'Failed to load user data');
      }
    };
    fetchUserData();
  }, [navigation]);

  // Verify password
  const verifyPassword = async () => {
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    try {
      const res = await fetch('http://192.168.1.6:3000/api/auth/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        setIsPasswordVerified(true);
        Alert.alert('Success', 'Password verified successfully!', [
          { text: 'OK', onPress: () => console.log('Password verification confirmed') }
        ]);
      } else {
        Alert.alert('Error', `Password verification failed: ${data.message || 'Invalid password'}`);
      }
    } catch (error) {
      Alert.alert('Error', `Password verification failed: Network error - ${error.message}`);
    }
  };


  // Handle save changes
  const handleSave = async () => {
    if (!isPasswordVerified) {
      Alert.alert('Error', 'Please verify your password first');
      return;
    }

    if (!username.trim() || !email.trim()) {
      Alert.alert('Error', 'Username and email cannot be empty');
      return;
    }

    try {
      
      const res = await fetch('http://192.168.1.6:3000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({originalUsername,username,email}),
      });

      const data = await res.json();
      if (res.ok) {
        await AsyncStorage.setItem('user', JSON.stringify({ username, email, image: data.imageUrl || image }));
        Alert.alert('Success', 'Profile updated successfully');
        navigation.navigate('Profile');
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.log('Profile update error:', error.message);
      Alert.alert('Error', `Network error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

    

      {/* Password Verification */}
      {!isPasswordVerified && (
        <>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
          />
          <Pressable style={styles.button} onPress={verifyPassword}>
            <Text style={styles.buttonText}>Verify Password</Text>
          </Pressable>
        </>
      )}

      {/* Edit Fields (Shown after password verification) */}
      {isPasswordVerified && (
        <>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter new username"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter new email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(238, 237, 237)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'rgb(93, 98, 90)',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'rgb(171, 169, 169)',
  },
  imageNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'rgb(93, 98, 90)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
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
});

export default EditProfile;