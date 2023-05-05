import React from "react"
import { TextInput, View, Text } from "react-native"
import { StyleSheet } from "react-native"

const HintInput = (
    value: string,
    placeholder: string,
    onChangeText: (text: string) => void,
    number: number) => {
    return (
        <View style={styles.hintInputContainer}>
            <Text style={styles.number}>{number}. </Text>
            <TextInput
                value={value}
                style={styles.hintInputText}
                placeholder={placeholder}
                placeholderTextColor={"gray"}
                onChangeText={onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    hintInputContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    number: {
        marginRight: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    hintInputText: {
        width: "100%",
        height: 20,
        fontSize: 18,
        borderBottomWidth: 1
    }
})

export default HintInput