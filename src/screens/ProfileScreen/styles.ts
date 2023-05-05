import { StyleSheet } from "react-native";

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
        marginHorizontal: 5,
        flex: 1,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#CE6B35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginVertical: 10,
        marginRight: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    textInside: {
        fontSize: 20,
        fontWeight: "normal"
    },
    imageBackground: {
        flex: 1,
        flexGrow: 1,
        paddingTop: 130,
        marginTop: 20,
        paddingBottom: 70,
        paddingHorizontal: "10%",
        justifyContent: "space-evenly"
    },
    instaText: {
        fontSize: 20,
        marginTop: 15,
        textAlign: "center"
    },
    buttonsContainer: {
        marginVertical: 20,
        flexDirection: "row"
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
    }
})

export default styles