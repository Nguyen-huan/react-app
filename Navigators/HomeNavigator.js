import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import ProductContainer from "../screens/product/ProductContainer";
import SingleProduct from '../screens/product/SingleProduct';
// import Slides from '../screens/Onboarding'
// import Landing from '../screens/User/Landing'
// import Login from '../screens/User/Login'
import CartScreen from '../screens/Cart/CartScreen'
import MessageScreen from "../screens/messageScreen";
import CheckoutNavigator from "./CheckoutNavigator";
const Stack = createNativeStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName='ProductContainer' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductContainer" component={ProductContainer} />
      <Stack.Screen name="CartScreen" component={CartScreen} />


      {/* <Stack.Screen name="Slides" component={Slides} />
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} /> */}

      <Stack.Screen name="Product Detail" component={SingleProduct} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutNavigator} />
    </Stack.Navigator>
  )
}

export default function MyStack() {
  return <HomeNavigation />
}

const styles = StyleSheet.create({})