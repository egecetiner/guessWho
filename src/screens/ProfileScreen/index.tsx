import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';
import styles from './styles';
import { getBase64FromUrl } from '../../utils/UsefulFunctions';
import Loading from '../../utils/Loading';
import { UserContext } from '../../context/UserContext';

const ProfileScreen = ({ navigation }: any) => {
    const { user, setUser } = useContext(UserContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [base64Image, setBase64Image] = useState<string>("")

    useEffect(() =>
        navigation.addListener('beforeRemove', (e: any) => {
            e.preventDefault();
        }),
        [navigation]);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        setLoading(true)
        await getUniqueId().then(async (item) => {
            await firestore().collection('Users').doc(item).get().then(async (data) => {
                let newUser = data.data()
                if (newUser) {
                    setUser(newUser)
                    try {
                        await getBase64FromUrl(newUser?.imageUrl).then((result: any) => {
                            setBase64Image(result)
                        })
                    }
                    catch {
                        console.warn("Image is not possible to convert base64")
                    }
                } else {
                    navigation.push('Intro')
                }
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    const TextInside = (hint: string, number: number) => {
        return (
            <Text key={number} style={styles.text}>{number}.
                <Text style={styles.textInside}> {hint}</Text>
            </Text>
        )
    }

    const onClickUpdate = () => {
        navigation.push('ProfileUpdate', { base64Image: base64Image })
    }
    const onClickGuess = () => {
        navigation.jumpTo('GuessStack');
    }

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <View style={styles.mainView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={base64Image ? styles.image : styles.emptyImage}
                            source={base64Image ? { uri: base64Image } : require("../../assets/User.png")}
                        />
                    </View>
                    <Text style={styles.instaText}>{user?.instagram}</Text>
                    <ImageBackground
                        source={require('../../assets/Notebook.png')}
                        resizeMode="cover"
                        style={styles.imageBackground}
                    >
                        {user?.hints.map((hint: string, index: number) => {
                            return (TextInside(hint, index + 1))
                        })}
                    </ImageBackground>
                </ScrollView>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={
                            styles.btn
                        }
                        onPress={onClickUpdate}>
                        <Text
                            style={styles.buttonText}>
                            EDIT PROFILE
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            styles.btn
                        }
                        onPress={onClickGuess}>
                        <Text
                            style={styles.buttonText}>
                            START GUESSING
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ProfileScreen;
