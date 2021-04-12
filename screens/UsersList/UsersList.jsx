/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, Avatar } from 'react-native-elements';
import firebase from '../../database/firebase';

const UsersList = (props) => {
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

  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate('CreateUserScreen')}
      />
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
            source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
            rounded
          />
          <ListItem.Content>
            <ListItem.Title>{user.name}</ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};
export default UsersList;
