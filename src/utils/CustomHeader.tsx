import React, { useEffect, useState } from "react"
import { View, Image, ColorSchemeName } from "react-native"
import { Appearance } from 'react-native';

const CustomHeader = () => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(undefined)

  useEffect(() => {
    setColorScheme(Appearance.getColorScheme())
  }, []);

  return (
    <View style={{ flex: 1}} >
      {
        colorScheme === 'dark' ?  <Image

        style={{ width: 40, height: 40 }}
        source={require('../assets/Logo.png')}
      />
      :  
        <Image
        resizeMode="contain"
        style={{ width: 40, height: 40 }}
        source={require('../assets/Logo2.png')}
      />
      }
     
    </View>
  )
}

export default CustomHeader