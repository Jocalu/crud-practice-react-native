import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Button,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import firebase from '../../database/firebase';

export default function CreateUserScreen(props) {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomColor: '#cccccc',
      borderBottomWidth: 1,
    },
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
}

CreateUserScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
