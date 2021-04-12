/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  View, Button, TextInput, ScrollView, Alert,
} from 'react-native';
import firebase from '../../database/firebase';
import styles from './stylesCreateUser';

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === '') {
      Alert.alert('Please provide a name');
    } else {
      try {
        await firebase.db.collection('users').add({
          name: state.name,
          email: state.email,
          phone: state.phone,
        });
        props.navigation.navigate('UsersList');
      } catch (error) {
        Alert.alert('Error');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          onChangeText={(value) => handleChangeText('email', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText('phone', value)}
        />
      </View>

      <View>
        <Button title="Save User" onPress={() => saveNewUser()} />
      </View>

    </ScrollView>
  );
};

export default CreateUserScreen;
