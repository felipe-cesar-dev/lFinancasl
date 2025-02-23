import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from '@/styles/styles';

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
    <ImageBackground source={require('../../images/backgroundHome.jpeg')} style = {styles.layoutGeral}>
    <View style={{ padding: 50 }}>
      <TextInput
        value={itemExcluir}
        onChangeText={(text) => setItemExcluir(text)}
        placeholder="Digite o item a ser excluído"
      />
      <Button color='green' title="Excluir item" onPress={excluirItem} />
      <FlatList
        data={itensArmazenados}
        renderItem={({ item }) => (
          <View style = {styles.listaView}>
            <Text style = {styles.listaText}>Manutenção: {item.texto}</Text>
            <Text style = {styles.listaText}>Valor: R${item.valor}</Text>
            <Text style = {styles.listaText}>Data: {item.data} {'\n'}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button color='green' title="Excluir todos os itens da lista" onPress={excluirTodosItens} />
    </View>
    </ImageBackground>
  );
};

export default Lista;