import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: 20,
        borderTopWidth: 2
    },
    image: {
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 60,
        width: 150,
        height: 150,
    },
    imageContainer: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: 150,
        maxHeight: 150,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "black",
    },
    textInput: {
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,
        height: 50,
        padding: 10,
        fontSize: 20,
        textAlign: "center"
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#CE6B35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: "black",
        marginVertical: 10,
        marginRight: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    textInside: {
        color: "black",
        fontSize: 20,
        fontWeight: "normal"
    },
    imageBackground: {
        flexGrow: 1,
        flex: 1,
        paddingTop: 60,
        paddingBottom: 80,
        marginTop: 20,
        opacity: 0.8,
        paddingHorizontal: "10%",
    },
    instaText: {
        color: "black",
        fontSize: 20,
        marginTop: 15,
        textAlign: "center"
    },
    buttonsContainer: {
        marginTop: 30,
        marginBottom: 10,
        flexDirection: "row"
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
        padding: 10
    },
    emptyImage: {
        borderWidth: 2,
        borderRadius: 60,
        opacity: 0.8,
        borderColor: "black",
        backgroundColor: "white",
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    linearGradient: {
        height: '100%',
        width: '100%'
    },
    backgroundImage: {
        flex: 1,
        width: width
    },
    contentHeadlines: {
        color: "black",
        fontWeight: "bold",
        fontSize: 25
    },
    statistics: {
        marginVertical: 10,
        width: "70%",
        alignSelf: "center",
        justifyContent: "center"
    },
    statisticsView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    statisticsText: {
        color: "black",
        fontSize: 20
    },
    statisticsHead: {
        color: "black",
        fontSize: 20
    }
})

export default styles