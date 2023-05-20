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
            <Text style={styles.number}>{number}.</Text>
            <TextInput
                multiline
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
        justifyContent: "space-between"
    },
    number: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center"
    },
    hintInputText: {
        maxWidth: "90%",
        minHeight: 60,
        maxHeight: 90,
        flexGrow: 1,
        flex: 1,
        fontSize: 18,
        borderWidth: 2,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        justifyContent: "center",
        borderColor: "black",
    }
})

export default HintInput