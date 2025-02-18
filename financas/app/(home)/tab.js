import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Lista from '../(lista)/lista.js';
import Page from './index.tsx'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Inserir Manutenções" component={Page} />
        <Tab.Screen name="Lista de Manutenções" component={Lista} />
      </Tab.Navigator>
  );
}