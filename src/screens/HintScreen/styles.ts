import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 2
  },
  image: {
    width: 100,
    resizeMode: 'contain',
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
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
  linearGradient: {
    height: '100%',
    width: '100%'
  },
  backgroundImage: {
    flex: 1,
    width: width
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
    marginTop: 20,
  },
  hintsContainer: {
    marginTop: 50,
    flex: 1,
    paddingHorizontal: 20,

  }
})

export default styles