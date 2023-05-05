import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info';
import styles from './styles';
import { User } from '../../utils/Types';
import getBase64FromUrl from '../../utils/UsefulFunctions';
import Loading from '../../utils/Loading';

const ProfileScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User>(undefined)
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
            try {
                await firestore().collection('Users').doc(item).get().then(async (data) => {
                    let newUser = data.data()
                    if (newUser) {
                        setUser(newUser)
                        await getBase64FromUrl(newUser?.imageUrl).then((result: any) => {
                            setBase64Image(result)
                        })
                    } else {
                        navigation.push('Intro')
                    }
                })
            } catch {
                navigation.push('Intro')
            }
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
        navigation.push('ProfileUpdate', { user: user, base64Image: base64Image })
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
                            style={styles.image}
                            source={base64Image ? { uri: base64Image }: require("../../assets/addUser.png")}
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
