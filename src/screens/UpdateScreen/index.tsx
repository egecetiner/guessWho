import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styles from './styles';
import HintInput from '../../utils/HintInput';
import Loading from '../../utils/Loading';
import { UserContext } from '../../context/UserContext';

const UpdateScreen = ({ route, navigation }: any) => {
  const { base64Image }: { base64Image: string } = route.params
  const { user } = useContext(UserContext)
  const [username, setUsername] = useState(user?.instagram);
  const [hint1, setHint1] = useState(user?.hints[0]);
  const [hint2, setHint2] = useState(user?.hints[1]);
  const [hint3, setHint3] = useState(user?.hints[2]);
  const [hint4, setHint4] = useState(user?.hints[3]);
  const [hint5, setHint5] = useState(user?.hints[4]);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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

  const updateProfile = async () => {
    setLoading(true)
    if (!!image) {
      await storage().ref(user?.id).putFile(image);
    }
    await firestore().collection('Users').doc(user?.id).update({
      instagram: username,
      hints: [hint1, hint2, hint3, hint4, hint5],
    }).then(() => {
      navigation.push('TabNav')
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      cropping: true,
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

  if (loading) {
    return (
      <Loading />
    )
  } else {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.mainView}
          behavior={"height"}
          keyboardVerticalOffset={30}
        >

          {!isKeyboardVisible &&
            <TouchableOpacity
              onPress={choosePhotoFromLibrary}
              style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: image !== "" ? image : base64Image }} />
            </TouchableOpacity>
          }

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

          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={styles.hintsContainer}>
              {HintInput(hint1, 'I love techno!', (text) => setHint1(text), 1)}
              {HintInput(hint2, 'I am a software developer', (text) => setHint2(text), 2)}
              {HintInput(hint3, 'My biggest talent is...', (text) => setHint3(text), 3)}
              {HintInput(hint4, 'I make jokes when I am uncomfortable', (text) => setHint4(text), 4)}
              {HintInput(hint5, "I can't drive car", (text) => setHint5(text), 5)}
            </View>
          </TouchableWithoutFeedback>

          <TouchableOpacity
            style={
              styles.btn
            }
            disabled={(!hint1 || !hint2 || !hint3 || !hint4 || !hint5 || !username)}
            onPress={updateProfile}>
            <Text
              style={styles.btnText}>
              EDIT PROFILE
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default UpdateScreen;
