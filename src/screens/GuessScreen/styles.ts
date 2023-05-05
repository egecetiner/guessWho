import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        margin: 0,
        backgroundColor: "white",
        borderTopWidth: 2
    },
    imageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: 150,
        maxHeight: 150,
        marginRight: 20
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
        paddingBottom: 70,
        paddingHorizontal: "10%",
        justifyContent: "space-evenly"
    },
    textBold: {
        marginTop: 30,
        fontSize: 25,
        marginVertical: 15,
        textAlign: "center",
        fontWeight: "bold"
    },
    buttonContainer: {
        marginVertical: 20,
        flexDirection: "row"
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
    },
    iconContainer: {
        position: "absolute",
        borderWidth: 1,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        padding: 5,
        bottom: 0,
        backgroundColor: "black",
        width: 150,
        alignItems: "center"
    },
    image: {
        borderWidth: 2,
        borderRadius: 30,
        width: 150,
        height: 150,
    }
})

export default styles