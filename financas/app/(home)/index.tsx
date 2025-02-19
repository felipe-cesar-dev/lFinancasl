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
      <Text style = {{
        color: 'black',
        fontSize: 20,
        marginBottom: 20
      }}>Olá, {user?.emailAddresses[0].emailAddress}</Text>
      <SignOutButton/>
      
      <View style = {styles.layoutView} >
        <View style = {styles.view2}>
        <Text style = {styles.layoutText}>Digite a manutenção:</Text>
        <TextInput
          style = {styles.textInput}
          value={texto}
          onChangeText={(text) => setTexto(text)}
          placeholder="Ex: Troca de óleo"
        />
        <Text style = {styles.layoutText}>Valor</Text>
        <TextInput
          style = {styles.textInput}
          value={valor}
          onChangeText={(text) => setValor(text)}
          placeholder="R$30,00"
          keyboardType="numeric"
        />
        <Text style = {styles.layoutText}>Data da manutenção</Text>
        <TextInput
          style = {styles.textInput}
          value={data}
          onChangeText={(text) => setData(text)}
          placeholder="Digite uma data:"
        />
        </View>
        <Button color='green' title="Guardar manutenção" onPress={armazenarDados} />
      </View>
    </ImageBackground>
  );
};

export default Page;