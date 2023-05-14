import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 20,
        paddingTop: 10,
        borderTopWidth: 2
    },
    image: {
        borderWidth: 2,
        borderRadius: 60,
        width: 150,
        height: 150
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        alignSelf: "center",
        width: 150,
        maxHeight: 150,
        borderRadius: 60,
        marginBottom: 10
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 10,
        height: 50,
        padding: 10,
        fontSize: 20,
        textAlign: "center",
        backgroundColor: "#C0BBB5",
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#CE6B35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        flexDirection: "row"
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
        justifyContent: "center"
    },
    hintsContainer: {
        marginTop: 10,
        flex: 1
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
    },
    linearGradient: {
        height: '100%',
        width: '100%'
      },
      backgroundImage: {
        flex: 1,
        width: width
      },
      contentContainer: { 
        flexGrow: 1, 
        flexDirection: 'column', 
        justifyContent: 'space-between'
      },
      dropdownBox: {
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "#C0BBB5",
        marginBottom: 10
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
    },
    step2Text: {
        fontWeight: "bold",
        fontSize: 20,
    },
    step1Text: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 15
    },
})

export default styles