import React from 'react'
import { useState } from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'

const CreateUserScreen = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleChangeText = (name, value) => {
    setState({...state, [name]: value})
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
      <Button title="Save User" onPress={() => console.log(state)}></Button>
    </View>

  </ScrollView>
  )
}
export default CreateUserScreen

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