import React, { useContext, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styles from './styles';
import HintInput from '../../utils/HintInput';
import Loading from '../../utils/Loading';
import LinearGradient from 'react-native-linear-gradient';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { genderData, guessData } from '../RegisterScreen/listDatas';
import Entypo from 'react-native-vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppContext } from '../../context/AppContext';

const UpdateScreen = ({ navigation }: any) => {
  const { user, setUser } = useContext(AppContext)
  const [username, setUsername] = useState(user?.instagram);
  const [hint1, setHint1] = useState(user?.hints && user?.hints[0]);
  const [hint2, setHint2] = useState(user?.hints && user?.hints[1]);
  const [hint3, setHint3] = useState(user?.hints && user?.hints[2]);
  const [hint4, setHint4] = useState(user?.hints && user?.hints[3]);
  const [hint5, setHint5] = useState(user?.hints && user?.hints[4]);
  const [imagePath, setImagePath] = useState<string>("");
  const [imageBase64, setImageBase64] = useState<string | undefined | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>(user?.gender);
  const [selectedGuess, setSelectedGuess] = useState([]);

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
          registeredUser: true,
          instagram: username,
          hints: [hint1, hint2, hint3, hint4, hint5],
          gender: selectedGender,
          genderPreferences: selectedGuess
        }).then(() => {
          setUser({
            registeredUser: true,
            id: user?.id,
            imageUrl: imageBase64 !== "" ? imageBase64 : user?.imageUrl,
            instagram: username,
            hints: [hint1, hint2, hint3, hint4, hint5],
            gender: selectedGender,
            genderPreferences: selectedGuess,
            attempts: user?.attempts,
            correctGuess: user?.correctGuess
          })
        }).finally(() => {
          setLoading(false)
          Alert.alert(
            'Congratulations!',
            "Your profile has been updated.",
            [
              {
                text: 'OK', onPress: () => {
                  navigation.push('Profile')
                  navigation.push("Guess")
                }
              },
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
      if(user?.registeredUser) {
        await storage().ref(user?.id).delete();
      }
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
          start={{ x: 0, y: 0.6 }} end={{ x: 0, y: 1 }}
          colors={['rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 1)']}
          style={styles.linearGradient}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            extraScrollHeight={50}
            style={styles.mainView}>
            <Text style={styles.step1Text}>Profile Photo</Text>
            <TouchableOpacity
              onPress={choosePhotoFromLibrary}
              style={styles.imageContainer}>
              <Image
                style={user?.registeredUser ? styles.image : imagePath !== "" ? styles.image : styles.emptyImage}
                source={user?.registeredUser ? { uri: imagePath !== "" ? imagePath : user?.imageUrl } : imagePath !== "" ? { uri: imagePath } : require("../../assets/addUser.png")} />
            </TouchableOpacity>

            <Text style={styles.step2Text}>Hints</Text>
            <View style={styles.hintsContainer}>
              <HintInput value={hint1} placeholder="I love techno!" number={1} onChangeText={setHint1} />
              <HintInput value={hint2} placeholder="I am a software developer" number={2} onChangeText={setHint2} />
              <HintInput value={hint3} placeholder="My biggest talent is..." number={3} onChangeText={setHint3} />
              <HintInput value={hint4} placeholder="I make jokes when I am uncomfortable" number={4} onChangeText={setHint4} />
              <HintInput value={hint5} placeholder="I can't drive car!" number={5} onChangeText={setHint5} />
            </View>

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
              placeholder={selectedGuess.toString()}
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
                placeholderTextColor={"#474747"}
                onChangeText={(text) => setUsername(text)}
              />
            </View>

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
          </KeyboardAwareScrollView>
        </LinearGradient>
      </ImageBackground>
    )
  }
}

export default UpdateScreen;
