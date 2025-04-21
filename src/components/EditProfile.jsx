import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';

const EditProfile = () => {
  // State for username
  const [username, setUsername] = useState('CurrentUsername'); // Replace with actual user data

  // Placeholder for profile image (static for now)
  const profileImage = 'https://via.placeholder.com/150'; // Replace with actual image URL

  // Handle save changes
  const handleSave = () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }
    // TODO: Add API call to update username in backend
    Alert.alert('Success', `Username updated to: ${username}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Profile Image */}
      <Image
        source={{ uri: profileImage }}
        style={styles.profileImage}
      />
      <Text style={styles.imageNote}>Profile Image (Static)</Text>

      {/* Username Input */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter new username"
        autoCapitalize="none"
      />

      {/* Save Button */}
      <Button title="Save Changes" onPress={handleSave} color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 10,
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default EditProfile;