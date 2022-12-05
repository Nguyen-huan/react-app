import React from "react";
import {Text, View, ScrollView, StyleSheet, Dimensions, FlatList} from 'react-native';

import { connect } from "react-redux";

let {height, width} = Dimensions.get("window")


const ConfirmScreen = (props) => {
    const confirm = props.route.params;
  return (
      <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
              <Text style={{fontSize: 20, fontWeight: "bold"}}>
                  Confirm Order
              </Text>
              {props.route.params ?
                  <View style={{borderWidth: 1, borderColor: 'orange'}}>
                      <Text style={styles.title}>Shipping to: </Text>
                      <View style={{padding: 8}}>
                          <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                          <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
                          <Text>City: {confirm.order.order.city}</Text>
                          <Text>Zip Code: {confirm.order.order.zip}</Text>
                      </View>
                      <Text style={styles.title}>Items: </Text>
                  </View>
              : null }
          </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8
    },
    title: {
        alignItems: "center",
        margin: 8,
        fontSize: 16,
        fontWeight: "bold"
    },
    listItems: {
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
        width: width / 1.2,
    }
})

export default ConfirmScreen;