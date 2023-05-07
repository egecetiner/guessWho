import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor: "white",
      borderTopWidth: 2
    },
    image: {
      width: 100,
      resizeMode: 'contain',
    },
    imageContainer: {
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      alignSelf: "center",
      width: 200,
      maxHeight: 200,
      borderRadius: 80,
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
      marginVertical: 40,
      height: 50,
      borderRadius: 12,
      backgroundColor: '#CE6B35',
      justifyContent: 'center',
      alignItems: 'center',
    },
    hintHeadline: {
      fontSize: 30,
      fontWeight: "bold",
      textDecorationLine: "underline"
    },
    hintExplanation: {
      fontSize: 20,
      marginTop: 20
    },
    hintsContainer: {
      marginTop: 50,
      flex: 1,
      paddingHorizontal: 20,
      width: "90%"
    }
  })

  export default styles