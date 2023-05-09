import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styles from './styles';
import HintInput from '../../utils/HintInput';
import { UserContext } from '../../context/UserContext';
import Loading from '../../utils/Loading';

const UpdateScreen = ({ navigation }: any) => {
  const { user, setUser } = useContext(UserContext)
  const [username, setUsername] = useState(user?.instagram);
  const [hint1, setHint1] = useState(user?.hints[0]);
  const [hint2, setHint2] = useState(user?.hints[1]);
  const [hint3, setHint3] = useState(user?.hints[2]);
  const [hint4, setHint4] = useState(user?.hints[3]);
  const [hint5, setHint5] = useState(user?.hints[4]);
  const [imagePath, setImagePath] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string | undefined | null>("");
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
    if (!hint1 || !hint2 || !hint3 || !hint4 || !hint5 || !username) {
      Alert.alert(
        'Error',
        "You need to provide an instagram username and hints about yourself.",
        [
          { text: 'OK', onPress: () => console.log("ok") },
        ]
      )
    } else {
      setLoading(true)
      try {
        if (!!imagePath) {
          await storage().ref(user?.id).putFile(imagePath);
        }
        await firestore().collection('Users').doc(user?.id).update({
          instagram: username,
          hints: [hint1, hint2, hint3, hint4, hint5],
        }).then(() => {
          setUser({
            documentIndex: user?.documentIndex,
            id: user?.id,
            imageUrl: imageBase64 !== "" ? imageBase64 : user?.imageUrl,
            instagram: username,
            hints: [hint1, hint2, hint3, hint4, hint5],
          })
        }).finally(() => {
          setLoading(false)
          Alert.alert(
            'Congratulations!',
            "Your profile has been updated.",
            [
              { text: 'OK', onPress: () => navigation.push('Profile') },
            ]
          )
        })
      } catch {
        setLoading(false)
        Alert.alert(
          'Error',
          "We regret to inform you that the profile update process has failed.",
          [
            { text: 'OK', onPress: () => navigation.push('Profile') },
          ]
        );
      }
    }
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: 'photo',
      height: 200,
      width: 200,
      includeBase64: true
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

  const onPressDelete = () => {
    Alert.alert('Confirmation', 'Kindly confirm your intention to proceed with the deletion of your profile.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'Delete', onPress: deleteProfile
      },
    ])
  }

  const deleteProfile = async () => {
    setLoading(true)
    try {
      let biggestIndex = 0
      let biggestIndexId;
      await firestore().collection('Users').get().then((usersArray) => {
        usersArray.docs.forEach((oneUser) => {
          if (oneUser.data().documentIndex > biggestIndex) {
            biggestIndex = oneUser.data().documentIndex
            biggestIndexId = oneUser.data().id
          }
        })
      })
      await firestore().collection('Users').doc(biggestIndexId).update({
        documentIndex: user?.documentIndex,
      })
      await storage().ref(user?.id).delete();
      await firestore().collection('Users').doc(user?.id).delete()
        .then(() => {
          setUser(undefined)
          setLoading(false)
          Alert.alert(
            'Information',
            "Your profile has been successfully deleted.",
            [
              { text: 'OK', onPress: () => navigation.jumpTo('GuessStack') },
            ]
          );
        });
    } catch {
      setLoading(false)
      Alert.alert(
        'Information',
        "We regret to inform you that the profile deletion process has failed. Please contact us via email for further assistance.",
        [
          { text: 'OK', onPress: () => navigation.jumpTo('GuessStack') },
        ]
      );
    }
   
  }

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
                source={{ uri: imagePath !== "" ? imagePath : user?.imageUrl }} />
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

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={
                styles.btn
              }
              onPress={updateProfile}>
              <Text
                style={styles.btnText}>
                EDIT PROFILE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                [styles.btn, { marginLeft: 10, backgroundColor: "#C41E3A" }]
              }
              onPress={onPressDelete}>
              <Text
                style={styles.btnText}>
                DELETE PROFILE
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default UpdateScreen;
