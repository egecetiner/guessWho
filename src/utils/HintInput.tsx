import React from "react"
import { TextInput, View, Text, ViewStyle } from "react-native"
import { StyleSheet } from "react-native"

interface Props {
    value: string,
    placeholder: string,
    onChangeText: (text: string) => void,
    number: number,
    containerStyle?: ViewStyle
}
const HintInput: React.FC<Props> = ({ value, placeholder, onChangeText, number, containerStyle }) => {
    return (
        <View style={[styles.hintInputContainer, containerStyle]}>
            <Text style={styles.number}>{number}. </Text>
            <TextInput
                value={value}
                style={styles.hintInputText}
                placeholder={placeholder}
                placeholderTextColor={"#191919"}
                onChangeText={onChangeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    hintInputContainer: {
        marginBottom: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    number: {
        marginRight: 10,
        fontSize: 20,
        height: 30,
        fontWeight: "bold",
    },
    hintInputText: {
        flex: 1,
        height: 25,
        fontSize: 18,
        borderBottomWidth: 2,
    }
})

export default HintInput