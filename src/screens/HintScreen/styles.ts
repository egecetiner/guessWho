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
  linearGradient: {
    height: '100%',
    width: '100%'
  },
  backgroundImage: {
    flex: 1,
    width: width
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
  hintHeadline: {
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  hintExplanation: {
    fontSize: 20,
  },
  hintsContainer: {
    marginTop: 20,
    flex: 1
  }
})

export default styles