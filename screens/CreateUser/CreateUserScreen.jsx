import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
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
    buttonSave: {
      backgroundColor: '#2196f3',
      padding: 10,
      alignItems: 'center',
    },
    textWhite: {
      color: 'white',
      fontSize: 20,
    },
    textBlack: {
      color: 'black',
      fontSize: 20,
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
          style={styles.textBlack}
          placeholder="Name User"
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textBlack}
          placeholder="Email User"
          onChangeText={(value) => handleChangeText('email', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textBlack}
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText('phone', value)}
        />
      </View>

      <View>
        <TouchableHighlight
          style={styles.buttonSave}
          onPress={() => saveNewUser()}
        >
          <Text style={styles.textWhite}>Save User</Text>
        </TouchableHighlight>
      </View>

    </ScrollView>
  );
}

CreateUserScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
