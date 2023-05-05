import { Dimensions, StyleSheet } from "react-native"

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 60,
        borderTopWidth: 2,
        borderTopColor: "white"
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
        marginRight: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    textInside: {
        fontSize: 20,
        fontWeight: "normal"
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row"
    },
    wrongText: {
        color: "#C41E3A",
        fontSize: 30,
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold"
    },
    linearGradient: {
        height: '100%',
        width: '100%'
    },
    backgroundImage: {
        flex: 1,
        width: width
    }
})

export default styles