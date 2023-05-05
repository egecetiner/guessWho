import React, { useEffect, useState } from "react"
import { ActivityIndicator, View, StyleSheet, ColorSchemeName, Appearance } from "react-native"

const Loading = () => {
    const [colorScheme, setColorScheme] = useState<ColorSchemeName>(undefined)

    useEffect(() => {
        setColorScheme(Appearance.getColorScheme())
    }, []);

    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator color={colorScheme === "dark" ? "white" : "dark"} size={"large"} />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    }
})

export default Loading