import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Toast} from 'native-base';

import {styles} from '../styles';

export const loadView = (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

export function generateId(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.toString();
}

export function ehandling(props) {
  Toast.show({
    text: props.utilReducer.errorMessage,
    buttonText: 'Ok',
    type: 'danger',
    duration: 5000,
  });
  if (!props.utilReducer.session) props.navigation.navigate('Auth');
}

export function inputHandling(text) {
  Toast.show({
    text: text,
    buttonText: 'Ok',
    type: 'danger',
    duration: 3000,
  });
}

export function shandling(text) {
  Toast.show({
    text: text,
    buttonText: 'Ok',
    type: 'success',
    duration: 3000,
  });
}
