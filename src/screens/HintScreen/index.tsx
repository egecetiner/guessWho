import React, { useContext, useEffect, useState } from 'react';
import { Alert, ImageBackground, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';
import storage from '@react-native-firebase/storage';
import HintInput from '../../utils/HintInput';
import styles from './styles';
import Config from "react-native-config";
import Loading from '../../utils/Loading';
import { UserContext } from '../../context/UserContext';
import { HintRouteParams } from '../../utils/Types';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const HintScreen = ({ navigation, route }: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [hint1, setHint1] = useState<string>("");
  const [hint2, setHint2] = useState<string>("");
  const [hint3, setHint3] = useState<string>("");
  const [hint4, setHint4] = useState<string>("");
  const [hint5, setHint5] = useState<string>("");
  const [deviceId, setDeviceId] = useState<string>("")
  const { setUser } = useContext(UserContext)

  const { instagram, imagePath, imageBase64, gender, genderPreferences }: HintRouteParams = route.params

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
        let newUser = {
          id: deviceId,
          imageUrl: `${firebaseUrl}/o/${deviceId}?alt=media`,
          instagram: instagram,
          hints: [hint1, hint2, hint3, hint4, hint5],
          gender: gender,
          genderPreferences: genderPreferences,
          attempts: 0,
          correctGuess: 0
        }
        await firestore().collection('Users').doc(deviceId).set(newUser).then(() => {
          newUser.imageUrl = imageBase64
          setUser(newUser)
          setLoading(false)
          navigation.push('TabNav')
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
      <ImageBackground
        source={require("../../assets/Hint.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <LinearGradient
          start={{ x: 0, y: 0.3 }} end={{ x: 0, y: 1 }}
          colors={['rgba(255, 255, 255, 0.6)', 'rgba(0, 0, 0, 1)']}
          style={styles.linearGradient}>
            <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainer}
              extraScrollHeight={50}
              style={styles.mainView}
            >
              <Text style={styles.hintHeadline}>HINTS</Text>
              <Text style={styles.hintExplanation}>
                Provide five hints about yourself that don't relate to your physical appearance for others to guess you.
              </Text>

              <View style={styles.hintsContainer}>
                <HintInput value={hint1} placeholder="I love techno!" number={1} onChangeText={setHint1} />
                <HintInput value={hint2} placeholder="I am a software developer" number={2} onChangeText={setHint2} />
                <HintInput value={hint3} placeholder="My biggest talent is..." number={3} onChangeText={setHint3} />
                <HintInput value={hint4} placeholder="I make jokes when I am uncomfortable" number={4} onChangeText={setHint4} />
                <HintInput value={hint5} placeholder="I can't drive car!" number={5} onChangeText={setHint5} />
              </View>

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
            </KeyboardAwareScrollView>
        </LinearGradient>
      </ImageBackground>
    );
  }
}

export default HintScreen;
