import { StatusBar } from "expo-status-bar";
import { View, Text, FlatList, StyleSheet, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import slides from '../slides'
import OnboardingItem from '../components/OnboardingItem'
import Paginator from '../components/Paginator'
import NextButton from '../components/NextButton'
import { COLOR } from '../assets/font/color'

export default function Onboarding({ navigation }) {
  const [currentIndex, setCurrentItem] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [viewOnboarding, setViewOnboarding] = useState(false)

  const viewableIndexChanged = useRef(({ viewableItems }) => {
    setCurrentItem(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const ScrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
    } else {
      navigation.navigate("Landing")
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />
      <View style={{ flex: 5 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={
            Animated.event([
              { nativeEvent: { contentOffset: { x: scrollX } } }
            ], {
              useNativeDriver: false
            })
          }
          onViewableItemsChanged={viewableIndexChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={{ flex: 2 }}>
        <Paginator data={slides} scrollX={scrollX} />
        <NextButton ScrollTo={ScrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.mainColor
  }
})
