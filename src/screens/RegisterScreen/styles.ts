import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        margin: 0,
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
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        alignSelf: "center",
        height: 150,
        width: 150,
        borderRadius: 60,
        marginTop: 40
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
        marginTop: 40,
        marginBottom: 40,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#CE6B35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        width: 80,
        resizeMode: 'contain',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
    },
    step2Text: {
        fontSize: 20,
        marginTop: 40,
        marginBottom: 20
    },
    step1Text: {
        fontSize: 20,
        marginTop: 20
    },
    registerText: {
        fontSize: 30,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    textInputContainer: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 20
    }
})

export default styles;