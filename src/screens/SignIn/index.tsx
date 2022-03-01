import React, { useState } from 'react';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously()

  }

  function handleCreateUserAccount() {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => Alert.alert('Usuario criado com sucesso!'))
    .catch(err => {
      if(err.code === 'auth/email-already-in-use') {
       return Alert.alert('Este email já está em uso')
      }
    })
  }

  function handleForgotPassword() {
    auth()
    .sendPasswordResetEmail(email)
    .then(() => Alert.alert('Enviamos um link para redefinição de senha'))
  }

  async function handleSignInWithEmailAndPassword() {
    const { user } = auth().signInWithEmailAndPassword(email, password)

  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}