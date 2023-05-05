import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
        setImage(im.path)
      }
    }).catch(() => console.log("Canceled"))
  };

  const buttonOnPress = () => {
    navigation.push('Hints', { instagram: username, image: image })
  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.registerText}>REGISTER</Text>

      {!isKeyboardVisible &&
        <>
          <Text style={styles.step1Text}>Step 1: Upload a photo of yourself </Text>
          <TouchableOpacity onPress={choosePhotoFromLibrary} style={styles.imageContainer}>
            <Image
              style={!!image ? styles.image : styles.emptyImage}
              source={!!image ? { uri: image } : require('../../assets/addUser.png')}
            />
          </TouchableOpacity>
        </>
      }

      <Text style={styles.step2Text}>Step 2: Provide your Instagram username</Text>

      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}>
        <View style={styles.textInputContainer}>
          <TextInput
            value={username}
            style={styles.textInput}
            placeholder='@egectnr'
            placeholderTextColor={"gray"}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={
          styles.btn
        }
        disabled={(!username)}
        onPress={buttonOnPress}>
        <Text
          style={styles.buttonText}>
          NEXT STEP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterScreen;
