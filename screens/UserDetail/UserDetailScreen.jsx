import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  View,
  Alert,
  StyleSheet,
  Text,
} from 'react-native';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import firebase from '../../database/firebase';

export default function UserDetailScreen(props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
    },
    buttonDelete: {
      backgroundColor: '#f2323f',
      padding: 10,
      alignItems: 'center',
    },
    buttonUpdate: {
      backgroundColor: '#1bb54e',
      padding: 10,
      alignItems: 'center',
      marginBottom: 10,
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

  const initialState = {
    id: '',
    name: '',
    email: '',
    phone: '',
  };

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection('users').doc(id);
    const doc = await dbRef.get();
    const userInfo = doc.data();
    setUser({
      ...userInfo,
      id: doc.id,
    });
    setLoading(false);
  };

  const deleteUser = async () => {
    const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate('UsersList');
  };

  const updateUser = async () => {
    const dbRef = firebase.db.collection('users').doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setUser(initialState);
    props.navigation.navigate('UsersList');
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const openConfirmationAlert = () => {
    Alert.alert('Remove The User', 'Are you sure?', [{ text: 'Yes', onPress: () => deleteUser() },
      { text: 'No' }]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textBlack}
          placeholder="Name User"
          value={user.name}
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textBlack}
          placeholder="Email User"
          value={user.email}
          onChangeText={(value) => handleChangeText('email', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.textBlack}
          placeholder="Phone User"
          value={user.phone}
          onChangeText={(value) => handleChangeText('phone', value)}
        />
      </View>

      <View>
        <TouchableHighlight
          style={styles.buttonUpdate}
          onPress={() => updateUser()}
        >
          <Text style={styles.textWhite}>Update User</Text>
        </TouchableHighlight>
      </View>
      <View>
        <TouchableHighlight
          style={styles.buttonDelete}
          onPress={() => openConfirmationAlert()}
        >
          <Text style={styles.textWhite}>Delete User</Text>
        </TouchableHighlight>
      </View>

    </ScrollView>
  );
}
UserDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
