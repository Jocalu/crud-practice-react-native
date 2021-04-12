import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import UsersList from './screens/UsersList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';

const Stack = createStackNavigator()

function myStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={UsersList}/>
      <Stack.Screen component={CreateUserScreen}/>
      <Stack.Screen component={UserDetailScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
<NavigationContainer>

</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
