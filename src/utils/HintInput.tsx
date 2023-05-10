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
        borderBottomWidth: 2
    }
})

export default HintInput