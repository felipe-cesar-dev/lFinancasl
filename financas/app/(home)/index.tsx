import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '@clerk/clerk-expo'

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
    <View style={{ padding: 50 }}>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <TextInput
        value={texto}
        onChangeText={(text) => setTexto(text)}
        placeholder="Digite a manutenção:"
      />
      <TextInput
        value={valor}
        onChangeText={(text) => setValor(text)}
        placeholder="Digite um valor:"
        keyboardType="numeric"
      />
      <TextInput
        value={data}
        onChangeText={(text) => setData(text)}
        placeholder="Digite uma data:"
      />
      <Button title="Armazenar" onPress={armazenarDados} />
    </View>
  );
};

export default Page;