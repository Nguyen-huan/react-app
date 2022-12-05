import { StyleSheet, Text, View, ScrollView, StatusBar, Platform, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
// redux
import { useSelector, useDispatch } from 'react-redux'
import { cartSlice } from '../../redux/slices/cartSlice'
import { cartItemsSelector, selectBasketTotal } from '../../redux/selector'

import { COLOR } from '../../assets/font/color'

// Component
import CartItem from '../../components/Cart/CartItem'
export default function CartScreen(props) {
  const dispatch = useDispatch()
  const cartItems = useSelector(cartItemsSelector)
  const deliveryPrice = 4.00
  const totalPrice = useSelector(selectBasketTotal)
  const handleClickRemoveAll = () => {
    dispatch(cartSlice.actions.removeAll())
  }
  const a = []
  return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.title}>My Cart</Text>
            {/* Wallet */}
            <View style={styles.wallet}>
              <LinearGradient colors={['rgba(232, 192, 61, 1)', 'rgba(190, 100, 109, 1)']}
                              style={{ padding: 10, paddingHorizontal: 30, borderRadius: 10 }}
                              end={{ x: 1, y: 0.5 }}
              >
                <Text style={{ fontSize: 15, color: 'white' }}>Wallet</Text>
              </LinearGradient>
              <Text style={{
                fontSize: 20,
                color: 'white',
              }}>$100.00</Text>
            </View>
            <View style={styles.line}></View>
          </View>
          {/* Order */}
          {
            cartItems.length > 0
                ? (

                    <>
                      <View style={styles.order}>
                        <Text style={{ fontSize: 15, color: 'white', fontWeight: '600' }}>Item to Order</Text>
                        <ScrollView style={{ height: 350 }}>
                          {
                            cartItems.map((item, index) => {
                              return (
                                  <CartItem key={index} item={item} />
                              )
                            })
                          }

                        </ScrollView>
                        <View style={{ width: '100%', justifyContent: 'space-between', marginTop: 15, flexDirection: 'row' }}>
                          <TouchableOpacity
                              style={[styles.button, { backgroundColor: '#242430' }]}
                              onPress={() => handleClickRemoveAll()}
                          >
                            <Text style={{ fontSize: 15, color: '#ccc', fontWeight: 'bold' }}>Remove All</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("CheckoutScreen")}>
                            <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>Pay</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.bill}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                          <Text style={styles.label}>Order</Text>
                          <Text style={styles.label}>${totalPrice.toFixed(2)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 5 }}>
                          <Text style={styles.label}>Delivery</Text>
                          <Text style={styles.label}>${deliveryPrice.toFixed(2)}</Text>
                        </View>
                      </View>
                      <View style={styles.line}></View>
                      <View style={styles.bill}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 5 }}>
                          <Text style={styles.label}>Total</Text>
                          <Text style={styles.label}>${(totalPrice + deliveryPrice).toFixed(2)}</Text>
                        </View>
                      </View>
                    </>
                ) : (
                    <View style={styles.noItem}>
                      <Image source={require('../../assets/images/order.png')} style={{ height: 150, width: 150, marginBottom: 20, }} resizeMode="contain" />
                      <Text style={{ fontSize: 20, color: 'white', marginBottom: 10 }}>Forgot to place an order, my friend !!</Text>
                      <Text style={{ fontSize: 15, color: 'white', opacity: 0.5 }}>Let's go back to order delicious dishes</Text>
                    </View>
                )
          }
        </SafeAreaView >
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLOR.mainColor,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    marginTop: -8
  },
  wallet: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  order: {
    width: '100%', color: 'white',
    padding: 20,
    backgroundColor: '#242430',
    marginTop: 20,
    marginBottom: 20
  },
  line: {
    height: 1,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
    opacity: 0.2
  },
  button: {
    backgroundColor: COLOR.secondaryColor,
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  bill: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 15,
    color: 'white'
  },
  noItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%', flex: 1,
    marginTop: 100
  }

})