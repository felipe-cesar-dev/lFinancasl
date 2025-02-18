import React, { useState } from 'react';
import { View, TextInput, Button, Text, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '@clerk/clerk-expo'
import { SignOutButton } from '../(auth)/sign-out';

import styles from '../../styles/styles'

const Page = () => {
  const [texto, setTexto] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const { user } = useUser()

  const armazenarDados = async () => {
    try {
      const chave = `dados-${Date.now()}`;
      const dados = { texto, valor, data };
      await AsyncStorage.setItem(chave, JSON.stringify(dados));
      setTexto('');
      setValor('');
      setData('');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ImageBackground 
        source={require('../../images/backgroundHome.jpeg')} style = {styles.layoutGeral}>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <SignOutButton/>
      
      <View style = {styles.layoutView} >

        <Text style = {styles.layoutText}>Digite a manutenção:</Text>
        <TextInput
          value={texto}
          onChangeText={(text) => setTexto(text)}
          placeholder="Ex: Troca de óleo"
        />
        <Text style = {styles.layoutText}>Valor</Text>
        <TextInput
          value={valor}
          onChangeText={(text) => setValor(text)}
          placeholder="R$30,00"
          keyboardType="numeric"
        />
        <Text style = {styles.layoutText}>Data da manutenção</Text>
        <TextInput
          value={data}
          onChangeText={(text) => setData(text)}
          placeholder="Digite uma data:"
        />
        <Button title="Guardar manutenção" onPress={armazenarDados} />
      </View>
    </ImageBackground>
  );
};

export default Page;