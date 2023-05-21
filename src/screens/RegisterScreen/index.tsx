import React, { useState } from 'react';
import { Alert, Image, ImageBackground, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { genderData, guessData } from './listDatas';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedGuess, setSelectedGuess] = React.useState([]);
  const [imageBase64, setImageBase64] = useState<string | undefined | null>("");

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
      mediaType: 'photo',
      height: 200,
      width: 200,
    }).then((im) => {
      if (im.size > 6000000) {
        Alert.alert(
          'Error',
          'Image size is too big',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]
        );
      } else {
        setImagePath(im.path)
        setImageBase64(`data:image/jpeg;base64,${im.data}`)
      }
    }).catch(() => console.log("Canceled"))
  };

  const buttonOnPress = () => {
    if (!username || !imagePath || !selectedGender || !selectedGuess.length || !selectedGender || !selectedGuess.length) {
      Alert.alert(
        'Error',
        "Kindly fill in all the required information.",
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    } else {
      navigation.push('Hints', {
        instagram: username,
        imagePath: imagePath,
        imageBase64: imageBase64,
        gender: selectedGender,
        genderPreferences: selectedGuess
      })
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/Register.jpg")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <LinearGradient
        start={{ x: 0, y: 0.6 }} end={{ x: 0, y: 1 }}
        colors={['rgba(255, 255, 255, 0.3)', 'rgba(0, 0, 0, 1)']}
        style={styles.linearGradient}>
        <KeyboardAwareScrollView
          style={styles.mainView}
          contentContainerStyle={styles.contentContainer}
          extraScrollHeight={50}
        >
          <Text style={styles.registerText}>REGISTER</Text>

          <Text style={styles.step1Text}>Upload a photo of yourself</Text>
          <TouchableOpacity onPress={choosePhotoFromLibrary} style={styles.imageContainer}>
            <Image
              style={!!imagePath ? styles.image : styles.emptyImage}
              source={!!imagePath ? { uri: imagePath } : require('../../assets/addUser.png')}
            />
          </TouchableOpacity>

          <Text style={styles.step2Text}>Gender Identity</Text>
          <SelectList
            setSelected={(val) => setSelectedGender(val)}
            data={genderData}
            save="value"
            boxStyles={styles.dropdownBox}
            inputStyles={styles.dropdownInput}
            search={false}
            arrowicon={<Entypo color="black" name='chevron-down' size={25} />}
            dropdownStyles={styles.dropdown}
            dropdownTextStyles={styles.dropdownText}
          />

          <Text style={styles.step2Text}>Preferred Gender to Guess</Text>
          <MultipleSelectList
            setSelected={(val) => setSelectedGuess(val)}
            data={guessData}
            save="value"
            label="Select the Gender You Prefer to Guess"
            boxStyles={styles.dropdownBox}
            inputStyles={styles.dropdownInput}
            search={false}
            arrowicon={<Entypo color="black" name='chevron-down' size={25} />}
            dropdownStyles={{ borderColor: "black", borderWidth: 2, backgroundColor: "#C0BBB5", marginTop: 10 }}
            dropdownTextStyles={styles.dropdownText}
          />

          <Text style={styles.step2Text}>Instagram Username</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              value={username}
              style={styles.textInput}
              placeholder='@egectnr'
              placeholderTextColor={Platform.OS == "android" ? "#bbbbbb" : "#474747"}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          <TouchableOpacity
            style={
              styles.btn
            }
            onPress={buttonOnPress}>
            <Text
              style={styles.buttonText}>
              NEXT STEP
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

export default RegisterScreen;
