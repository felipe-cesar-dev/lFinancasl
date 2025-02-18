import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Lista = () => {
  const [itensArmazenados, setItensArmazenados] = useState([]);
  const [itemExcluir, setItemExcluir] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const recuperarItens = async () => {
        try {
          const chaves = await AsyncStorage.getAllKeys();
          const itens = await AsyncStorage.multiGet(chaves);
          const itensArmazenados = itens.map((item) => JSON.parse(item[1]));
          setItensArmazenados(itensArmazenados);
        } catch (error) {
          alert(error);
        }
      };
      recuperarItens();
    }, [])
  );

  const excluirItem = async () => {
    try {
      const chaves = await AsyncStorage.getAllKeys();
      const itens = await AsyncStorage.multiGet(chaves);
      const itensArmazenados = itens.map((item) => JSON.parse(item[1]));
      const itemExcluirIndex = itensArmazenados.findIndex((item) => item.texto === itemExcluir);
      if (itemExcluirIndex !== -1) {
        const chaveExcluir = chaves[itemExcluirIndex];
        await AsyncStorage.removeItem(chaveExcluir);
        setItensArmazenados(itensArmazenados.filter((item) => item.texto !== itemExcluir));
        setItemExcluir(''); // Limpa o input após excluir
      } else {
        alert('Item não encontrado');
      }
    } catch (error) {
      alert(error);
    }
  };

  const excluirTodosItens = async () => {
    try {
      await AsyncStorage.clear();
      setItensArmazenados([]);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={{ padding: 50 }}>
      <TextInput
        value={itemExcluir}
        onChangeText={(text) => setItemExcluir(text)}
        placeholder="Digite o item a ser excluído"
      />
      <Button title="Excluir item" onPress={excluirItem} />
      <FlatList
        data={itensArmazenados}
        renderItem={({ item }) => (
          <View>
            <Text>Manutenção: {item.texto}</Text>
            <Text>Valor: R${item.valor}</Text>
            <Text>Data: {item.data} {'\n'}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Excluir todos os itens da lista" onPress={excluirTodosItens} />
    </View>
  );
};

export default Lista;