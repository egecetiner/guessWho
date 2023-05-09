import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';
import storage from '@react-native-firebase/storage';
import HintInput from '../../utils/HintInput';
import styles from './styles';
import Config from "react-native-config";
import Loading from '../../utils/Loading';
import { UserContext } from '../../context/UserContext';

const HintScreen = ({ navigation, route }: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [hint1, setHint1] = useState<string>("");
  const [hint2, setHint2] = useState<string>("");
  const [hint3, setHint3] = useState<string>("");
  const [hint4, setHint4] = useState<string>("");
  const [hint5, setHint5] = useState<string>("");
  const [deviceId, setDeviceId] = useState<string>("")
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const { setUser } = useContext(UserContext)

  const { instagram, imagePath, imageBase64 }: { instagram: string, imagePath: string, imageBase64: string } = route.params

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

  useEffect(() => { getDeviceId() }, []);

  const getDeviceId = async () => {
    await getUniqueId().then((item) => setDeviceId(item))
  }

  const createProfile = async () => {
    if (!hint1 || !hint2 || !hint3 || !hint4 || !hint5) {
      Alert.alert(
        'Error',
        "Please provide five hints about you.",
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    } else {
      setLoading(true)
      const firebaseUrl = Config.FIREBASE_URL
      try {
        await storage().ref(deviceId).putFile(imagePath);
        let collectionSize = await (await firestore().collection('Users').get()).size
        let newUser = {
          documentIndex: collectionSize, // new doc index is equal to collection size
          id: deviceId,
          imageUrl: `${firebaseUrl}/o/${deviceId}?alt=media`,
          instagram: instagram,
          hints: [hint1, hint2, hint3, hint4, hint5],
        }
        await firestore().collection('Users').doc(deviceId).set(newUser).then(() => {
          newUser.imageUrl = imageBase64
          setUser(newUser)
          setLoading(false)
          Alert.alert(
            'Congratulations!',
            "Your profile has been created.",
            [
              { text: 'Start guessing people!', onPress: () => navigation.push('TabNav') },
            ]
          );
        });
      } catch (e) {
        Alert.alert(
          'Error',
          "We regret to inform you that the profile creation process has failed.",
          [
            { text: 'OK', onPress: () => navigation.push('Register') },
          ]
        );
      }
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
          keyboardVerticalOffset={50}>

          {!isKeyboardVisible &&
            <>
              <Text style={styles.hintHeadline}>HINTS</Text>
              <Text style={styles.hintExplanation}>
                Provide five hints about yourself that don't relate to your physical appearance for others to guess you.
              </Text>
            </>
          }

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
            style={styles.btn}
            onPress={createProfile}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: "white",
              }}>
              COMPLETE PROFILE
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default HintScreen;
