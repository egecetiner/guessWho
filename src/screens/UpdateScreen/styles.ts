import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: "white",
        borderTopWidth: 2
    },
    image: {
        borderWidth: 2,
        borderRadius: 60,
        width: 150,
        height: 150,
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        alignSelf: "center",
        width: 150,
        maxHeight: 150,
        borderRadius: 60,
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 10,
        height: 50,
        padding: 10,
        fontSize: 20,
        textAlign: "center"
    },
    btn: {
        marginVertical: 20,
        marginHorizontal: 5,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#CE6B35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginRight: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    textInside: {
        fontSize: 20,
        fontWeight: "normal"
    },
    textInputContainer: {
        marginVertical: 15,
        justifyContent: "center"
    },
    hintsContainer: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 40,
        justifyContent: "space-between",
        width: "90%"
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
    },
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

export default styles