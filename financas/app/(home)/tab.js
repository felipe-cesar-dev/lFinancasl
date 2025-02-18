import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Lista from './lista.js';
import Page from './index.tsx'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inserir Manutenções" component={Page} />
        <Tab.Screen name="Lista de Manutenções" component={Lista} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}