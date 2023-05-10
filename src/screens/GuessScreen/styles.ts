import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: 20,
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
        marginTop: 20,
        flex: 1,
        flexGrow: 1,
        paddingTop: 100,
        paddingBottom: 50,
        paddingHorizontal: "10%",
        justifyContent: "space-evenly",
        opacity: 0.8
    },
    textBold: {
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold"
    },
    buttonContainer: {
        justifyContent: "center",
        height: 50,
        marginVertical: 10,
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
    },
    linearGradient: {
        height: '100%',
        width: '100%'
    },
    backgroundImage: {
        flex: 1,
        width: width
    },
})

export default styles