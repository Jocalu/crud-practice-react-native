/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import firebase from '../database/firebase'

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleChangeText = (name, value) => {
    setState({...state, [name]: value})
  }

  const saveNewUser = async () => {
    if(state.name === ''){
      alert('Please provide a name')
    } else {
      try {
      await firebase.db.collection('users').add({
        name: state.name,
        email: state.email,
        phone: state.phone,
      })
      props.navigation.navigate('UserList')
      } catch (error){
        console.log(error)
      }
    }
  }

  return (
  <ScrollView style={styles.container}>
    <View style={styles.inputGroup}>
      <TextInput 
      placeholder="Name User" 
      onChangeText={(value) => handleChangeText('name', value)}
      ></TextInput>
    </View>

    <View style={styles.inputGroup}>
      <TextInput 
      placeholder="Email User" 
      onChangeText={(value) => handleChangeText('email', value)}
      ></TextInput>
    </View>

    <View style={styles.inputGroup}>
      <TextInput 
      placeholder="Phone User" 
      onChangeText={(value) => handleChangeText('phone', value)}
      ></TextInput>
    </View>

    <View>
      <Button title="Save User" onPress={() => saveNewUser()}></Button>
    </View>

  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:35,
  },
  inputGroup: {
    flex: 1,
    padding:0,
    marginBottom: 15,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1
  }
})

export default CreateUserScreen