/* eslint-disable react/prop-types */
import React , {useEffect, useState} from 'react'
import {View, Text, Button} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '../database/firebase'

const UsersList = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    firebase.db.collection('users').onSnapshot(querySnapshot => {
      const users = [];

      querySnapshot.docs.forEach(doc => {
        const {name, email, phone} = doc.data()
        users.push({
          id: doc.id,  
          name, 
          email, 
          phone
        })
      })
      setUsers(users)
    })
  }), ([]);

  return (
   <ScrollView>
     <Button 
      title="Create User" 
      onPress={() => props.navigation.navigate('CreateUserScreen')}></Button>
   </ScrollView>
  )
}
export default UsersList