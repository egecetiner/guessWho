import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styles from './styles';
import HintInput from '../../utils/HintInput';
import { UserContext } from '../../context/UserContext';
import Loading from '../../utils/Loading';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { genderData, guessData } from '../RegisterScreen/listDatas';
import Entypo from 'react-native-vector-icons/Entypo';

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
  const [selectedGender, setSelectedGender] = useState<string>(user?.gender);
  const [selectedGuess, setSelectedGuess] = React.useState(user?.genderPreferences);

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
    if (!hint1 || !hint2 || !hint3 || !hint4 || !hint5 || !username || !selectedGender || !selectedGuess.length) {
      Alert.alert(
        'Error',
        "Kindly fill in all the required information.",
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
          gender: selectedGender,
          genderPreferences: selectedGuess
        }).then(() => {
          setUser({
            documentIndex: user?.documentIndex,
            id: user?.id,
            imageUrl: imageBase64 !== "" ? imageBase64 : user?.imageUrl,
            instagram: username,
            hints: [hint1, hint2, hint3, hint4, hint5],
            gender: user?.gender,
            genderPreferences: user?.genderPreferences
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
              { text: 'OK', onPress: () => navigation.push("Intro") },
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
      <ImageBackground
        source={require("../../assets/Update.jpeg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <LinearGradient
          start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }}
          colors={['rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 1)']}
          style={styles.linearGradient}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <KeyboardAvoidingView
              style={styles.mainView}
              behavior={"height"}
              keyboardVerticalOffset={30}
            >
              {!isKeyboardVisible &&
                <>
                  <Text style={styles.step1Text}>Profile Photo</Text>
                  <TouchableOpacity
                    onPress={choosePhotoFromLibrary}
                    style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{ uri: imagePath !== "" ? imagePath : user?.imageUrl }} />
                  </TouchableOpacity>
                </>
              }
              <Text style={styles.step2Text}>Hints</Text>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <View style={styles.hintsContainer}>
                  <HintInput  containerStyle={{marginBottom: 10}} value={hint1} placeholder="I love techno!" number={1} onChangeText={setHint1} />
                  <HintInput containerStyle={{marginBottom: 10}} value={hint2} placeholder="I am a software developer" number={2} onChangeText={setHint2} />
                  <HintInput containerStyle={{marginBottom: 10}} value={hint3} placeholder="My biggest talent is..." number={3} onChangeText={setHint3} />
                  <HintInput containerStyle={{marginBottom: 10}} value={hint4} placeholder="I make jokes when I am uncomfortable" number={4} onChangeText={setHint4} />
                  <HintInput value={hint5} placeholder="I can't drive car!" number={5} onChangeText={setHint5} />
                </View>
              </TouchableWithoutFeedback>

              {!isKeyboardVisible &&
                <>
                  <Text style={styles.step2Text}>Gender Identity</Text>
                  <SelectList
                    setSelected={(val) => setSelectedGender(val)}
                    data={genderData}
                    placeholder={selectedGender}
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
                    placeholder={selectedGuess.toString()}
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
                </>

              }
              <Text style={styles.step2Text}>Instagram Username</Text>
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={username}
                    style={styles.textInput}
                    placeholder='@egectnr'
                    placeholderTextColor={"#474747"}
                    onChangeText={(text) => setUsername(text)}
                  />
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
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    )
  }
}

export default UpdateScreen;
