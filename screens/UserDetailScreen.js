/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'
import { ActivityIndicator, Button } from 'react-native'
import {View, StyleSheet} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import firebase from '../database/firebase'

const UserDetailScreen = (props) => {
    const [user, setUser] = useState({
      id: '',
      name: '',
      email: '',
      phone: ''
  })
  const [loading, setLoading] = useState(true)

  const getUserById = async(id) => {
    const dbRef = firebase.db.collection('users').doc(id)
    const doc = await dbRef.get()
    const user = doc.data()
    setUser({
      ...user,
      id: doc.id, 
    })
    setLoading(false)
  }

  useEffect(()=>{
    getUserById(props.route.params.userId)
  })

  const handleChangeText = (name, value) => {
    setState({...state, [name]: value})

    if (loading){
      return(
        <View>
            <ActivityIndicator size="large" color="#9e9e9e" />
        </View>
      )
    }
  }

  return (
   <ScrollView style={styles.container}>
    <View style={styles.inputGroup}>
      <TextInput 
      placeholder="Name User" 
      value={user.name}
      onChangeText={(value) => handleChangeText('name', value)}
      ></TextInput>
    </View>

    <View style={styles.inputGroup}>
      <TextInput 
      placeholder="Email User" 
      value={user.email}
      onChangeText={(value) => handleChangeText('email', value)}
      ></TextInput>
    </View>

    <View style={styles.inputGroup}>
      <TextInput 
      placeholder="Phone User" 
      value={user.phone}
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