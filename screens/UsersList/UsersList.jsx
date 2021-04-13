import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { ListItem, Avatar } from 'react-native-elements';
import firebase from '../../database/firebase';

export default function UsersList(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection('users').onSnapshot((querySnapshot) => {
      const usersInfo = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        usersInfo.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });
      setUsers(usersInfo);
    });
  }, []);

  const styles = StyleSheet.create({
    buttonCreate: {
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
  });

  return (
    <ScrollView>

      {users.map((user) => (
        <ListItem
          key={user.id}
          bottomDivider
          onPress={() => props.navigation.navigate('UserDetailScreen', {
            userId: user.id,
          })}
        >
          <ListItem.Chevron />
          <Avatar
            source={{ uri: 'https://lh3.googleusercontent.com/proxy/hzcIFTi6tu-A4hteXy2XI-5eDUNabwBIaz5tHmg8HY7ryyQZCH_9zYDKlU8dy1Godx-EuowKVwmlV_IDjzPpN4JuvvH9pfEr-P57iNlrXRSYXCNti3nHg7o' }}
            rounded
          />
          <ListItem.Content>
            <ListItem.Title style={styles.textBlack}>{user.name}</ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
      <TouchableHighlight
        style={styles.buttonCreate}
        onPress={() => props.navigation.navigate('CreateUserScreen')}
      >
        <Text style={styles.textWhite}>Create User</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

UsersList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
