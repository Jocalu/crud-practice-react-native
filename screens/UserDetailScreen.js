/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'
import { ActivityIndicator, Button } from 'react-native'
import {View, StyleSheet, Alert} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import firebase from '../database/firebase'

const UserDetailScreen = (props) => {
  const initialState = {
      id: '',
      name: '',
      email: '',
      phone: ''
  }
    const [user, setUser] = useState()
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
  }), ([])

  const handleChangeText = (name, value) => {
    setUser({...user, [name]: value})
}

const deleteUser = async() => {
    const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
 await dbRef.delete();
 props.navigation.navigate('UsersList')
}

const updateUser = async() => {
    const dbRef = firebase.db.collection('users').doc(user.id)
 await dbRef.set({
   name: user.name,
   email: user.email,
   phone: user.phone
 });
setUser(initialState)
 props.navigation.navigate('UsersList')

}

const openConfirmationAlert = () => {
Alert.alert('Remove The User', 'Are you sure?', [{text:'Yes', onPress: () => deleteUser()},
{text:'No', onPress: () => console.log('false')}])
}

    if (loading){
      return(
        <View>
            <ActivityIndicator size="large" color="#9e9e9e" />
        </View>
      )
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
        onPress={() => updateUser()} />
    </View>
    <View> 
      <Button 
        color="#E37399" 
        title="Delete User" 
        onPress={() => openConfirmationAlert()} />
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