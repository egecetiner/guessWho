import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        borderTopWidth: 2
    },
    contentContainer: { 
        flexGrow: 1, 
        flexDirection: 'column', 
        justifyContent: 'space-between'
      },
    image: {
        borderWidth: 2,
        borderRadius: 60,
        width: 150,
        height: 150,
    },
    linearGradient: {
        height: '100%',
        width: '100%'
    },
    backgroundImage: {
        flex: 1,
        width: width
    },
    imageContainer: {
        backgroundColor: "#C0BBB5",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        alignSelf: "center",
        height: 150,
        width: 150,
        borderRadius: 60,
        marginTop: 10,
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
        marginTop: 20,
        marginBottom: 40,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#CE6B35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
    },
    step2Text: {
        fontSize: 20,
        marginTop: 15,
        marginBottom: 5
    },
    step1Text: {
        fontSize: 20,
    },
    registerText: {
        fontSize: 30,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    textInputContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    dropdownBox: {
        borderColor: "black",
        borderWidth: 2,
        marginBottom: 0
    },
    dropdownInput: {
        fontSize: 20,
        color: "black"
    },
    dropdown: {
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "#C0BBB5"
    },
    dropdownText: {
        fontSize: 20
    }
})

export default styles;