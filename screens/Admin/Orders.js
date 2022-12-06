import { StyleSheet, Text, View, ScrollView, Platform, StatusBar } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { COLOR } from '../../assets/font/color'
import { useFocusEffect } from '@react-navigation/native'

// api
import baseUrl from '../../common/baseUrl'
import axios from 'axios'

// component
import OrderCard from '../../components/Cart/OrderCard'
import Loading from '../../components/Loading'
// Context
import AuthGlobal from '../../Context/store/AuthGlobal'


export default function Orders(props) {
  const context = useContext(AuthGlobal)
  const [isAdmin, setIsAdmin] = useState(false)
  const [customer, setCustomer] = useState('')
  const [orderListAll, setOrderListAll] = useState()
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseUrl}orders`)
        .then((res) => {
          // if (isAdmin) {
          setOrderListAll(res.data)
          // }
          // else {
          //   setOrderListAll(checkOrder(res.data))
          // }
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
      setLoading(true)
      setIsAdmin(context.stateUser.user.isAdmin)
      setCustomer(context.stateUser.user.customerId)
    }, [context.stateUser.isAuthenticated])
  )


  return (

    loading ? <Loading /> :
      <ScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
        style={{ backgroundColor: COLOR.mainColor }}
      >

        <View style={styles.container}>
          <Text style={styles.title}>Orders</Text>
          <View style={{ width: '100%', }}>
            {
              orderListAll.length > 0 ?
                orderListAll.map((order) => {
                  // console.log(order.customer._id)
                  return <OrderCard key={order._id} order={order} navigation={props.navigation} isAdmin={isAdmin} />
                }
                ) : <View style={{ flex: 1, alignItems: 'center', }}>
                  <Text style={{ color: '#ccc', fontSize: 30, }}>No Orders</Text>
                </View>
            }
          </View>
        </View>

      </ScrollView >

  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: 'bold',
    marginBottom: 20
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignItems: 'center'
  }
})