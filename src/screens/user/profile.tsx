import {Button, Column, Input, useColorMode, Text} from 'native-base';
import React, { useState, useEffect, useRef } from "react";
import {Email} from '../../app/types';
import {
  userActions,
  appActions,
  useAppDispatch,
  useAppSelector,
} from '../../app/appStore';


export function ProfileScreen() {
  const validate = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      dispatch(
        userActions.setEmail(
          {email: {
            value: email,
            validationMessage: "Email is Not Correct"
          }}),
      );
    }
    else {
      dispatch(
        userActions.setEmail(
          {email: {
            value: email,
            validationMessage: ""
          }}),
      );
    }
  }

  const dispatch = useAppDispatch();
  const name = useAppSelector(state => state.user.name);
  const email = useAppSelector(state => state.user.email);
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const {toggleColorMode} = useColorMode();

  return (
    <Column
      alignItems="center"
      justifyContent="center"
      space="4"
      padding="4"
      height="full">
      <Input
        placeholder="Nome completo"
        value={name}
        onChangeText={name => {
          dispatch(
            userActions.setName({
              name,
            }),
          );
        }}
      />
      <Input
        placeholder="E-mail"
        value={email.value}
        onChangeText={(email) => validate(email)}
      />
      <Text style={{color:'red'}}>{email.validationMessage}</Text>

      <Button
        width="full"
        onPress={() => {
          toggleColorMode();
          dispatch(
            appActions.setDarkTheme({
              isDarkTheme: !isDarkTheme,
            }),
          );
        }}>
        Alterar Tema
      </Button>
    </Column>
  );
}


