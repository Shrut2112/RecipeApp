import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Welcom from './src/components/Welcom'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/components/Home'
import RecipePage from './src/components/RecipePage'
import Profile from './src/components/Profile'
import Login from './src/components/Login'
import Signup from './src/components/Signup'
import EditProfile from './src/components/EditProfile'

const Stack = createStackNavigator()

const Mystack = ()=>{
  return (
    <Stack.Navigator initialRouteName='Welcom'>
      <Stack.Screen name="Welcom" component={Welcom} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}}/>
      <Stack.Screen name="RecipePage" component={RecipePage} options={{headerShown:false}} />
      <Stack.Screen name="Profile" component={Profile}  />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Mystack />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})