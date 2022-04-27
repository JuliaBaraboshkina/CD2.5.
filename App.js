import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Wellcome from './Screen/Wellcome';
import AppAmination from './Screen/Animation';
const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Добро пожаловать">
      <Stack.Screen
        name="Добро пожаловать"
        component={Wellcome}
        options={{
          headerStyle: {
            backgroundColor: '#F59839',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen
        name="Анимация"
        component={AppAmination}
        options={{
          headerStyle: {
            backgroundColor: '#F59839',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;