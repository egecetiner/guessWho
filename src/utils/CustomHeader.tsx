import React, { useContext } from "react"
import { View, Image, StyleSheet } from "react-native"
import { AppContext } from "../context/AppContext"

const CustomHeader = () => {
  const { colorScheme } = useContext(AppContext)
  return (
    <View style={styles.container} >
      <Image
        resizeMode="contain"
        style={styles.image}
        source={colorScheme === 'dark' ? require('../assets/Logo.png') : require('../assets/Logo2.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 40,
    height: 40
  }
})

export default CustomHeader