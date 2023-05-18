import React, { useContext } from "react"
import { ActivityIndicator, View, StyleSheet, ColorSchemeName, Appearance } from "react-native"
import { AppContext } from "../context/AppContext"

const Loading = () => {
    const { colorScheme } = useContext(AppContext)

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