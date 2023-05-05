import { Dimensions, StyleSheet } from "react-native"

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: 60,
        paddingHorizontal: 20,
        borderTopWidth: 2,
        borderTopColor: "white"
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
    textContainer: {
        marginTop: 30,
        flexDirection: "column",
        alignItems: "center"
    },
    instagramHeadline: {
        fontWeight: "bold",
        fontSize: 20,
        textDecorationLine: "underline"
    },
    instagramText: {
        fontSize: 20,
        marginTop: 10
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row"
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
    },
    backgroundImage: {
        flex: 1,
        width: width
    },
    linearGradient: {
        height: "100%",
        width: '100%'
    },
})

export default styles