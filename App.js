import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Onboarding from './screens/Onboarding';
import Loading from './components/Loading'
import Profile from './screens/Profile'
import Main from './screens/Main'
import Landing from './screens/Landing'
import Login from './screens/Login'

//redux
import store from './redux/store'
import { Provider } from 'react-redux'





export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Slides' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Slides" component={Onboarding} />
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
