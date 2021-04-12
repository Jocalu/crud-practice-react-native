/* eslint-disable react/prop-types */
import React, {useEffect} from 'react'
import {View, Text} from 'react-native'
import firebase from '../database/firebase'

const UserDetailScreen = (props) => {

  const getUserById = async(id) => {
    const dbRef = firebase.db.collection('users').doc(id)
    const doc = await dbRef.get()
    const user = doc.data()
  }

  useEffect(()=>{
    getUserById(props.route.params.userId)
  })

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
export default UserDetailScreen