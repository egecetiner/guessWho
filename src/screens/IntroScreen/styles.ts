import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    subtitle: {
        color: "white",
        fontSize: 20,
        marginTop: 10,
        textAlign: 'left',
        marginLeft: 20,
        lineHeight: 23,
    },
    title: {
        color: "white",
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20,
        textAlign: 'left',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    indicator: {
        height: 5,
        width: 20,
        backgroundColor: 'grey',
        marginHorizontal: 5,
        borderRadius: 10,
    },
    btn: {
        marginTop: 20,
        flex: 1,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#CE6B35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        height: '100%',
        width: '100%'
    },
    slideContainer: {
        position: "absolute",
        bottom: 0,
        width: width,
        marginBottom: 10
    },
    footerContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 30
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: "white",
    },
    backgroundImage: {
        width: width,
        height: "100%"
    }
});

export default styles;