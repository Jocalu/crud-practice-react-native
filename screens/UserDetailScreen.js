/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'
import { Button } from 'react-native'
import {View, StyleSheet} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import firebase from '../database/firebase'

const UserDetailScreen = (props) => {
    const [state, setState] = useState({
      name: '',
      email: '',
      phone: ''
  })

  const getUserById = async(id) => {
    const dbRef = firebase.db.collection('users').doc(id)
    const doc = await dbRef.get()
    const user = doc.data()
  }

  useEffect(()=>{
    getUserById(props.route.params.userId)
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
      <Button 
        color="#19AC52" 
        title="Update User" 
        onPress={() => alert('ok')} />
    </View>
    <View> 
      <Button 
        color="#E37399" 
        title="Delete User" 
        onPress={() => alert('ok')} />
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
});


export default UserDetailScreen