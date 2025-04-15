import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Welcom from './src/components/Welcom'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/components/Home'
import RecipePage from './src/components/RecipePage'

const Stack = createStackNavigator()

const Mystack = ()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcom" component={Welcom} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Stack.Screen name="RecipePage" component={RecipePage} options={{headerShown:false}} />
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