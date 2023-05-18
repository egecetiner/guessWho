import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View, Image, FlatList, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { User } from '../../utils/Types';
import styles from './styles';
import Loading from '../../utils/Loading';
import { getBase64FromUrl, generateRandomNumber } from '../../utils/UsefulFunctions'
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { AppContext } from '../../context/AppContext';

const GuessScreen = ({ navigation, route }: any) => {
    const { user, setUser } = useContext(AppContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [chosenUser, setChosenUser] = useState<User>(undefined);
    const [newUsers, setNewUsers] = useState<Array<User>>();
    const [selectedUser, setSelectedUser] = useState<User>(undefined)
    const [scrollDown, setScrollDown] = useState<boolean>(false)
    const [notEnoughUser, setNotEnoughUser] = useState<boolean>(false)
    const scrollViewRef: any = useRef();

    useEffect(() => {
        navigation.addListener('beforeRemove', (e: any) => {
            e.preventDefault();
        })
    }, [navigation]);

    useEffect(() => {
        if (!route.params?.chosenUser) {
            fetchData()
        } else {
            setNewUsers(route.params.oldUsers)
            setChosenUser(route.params.chosenUser)
        }
    }, [user?.genderPreferences]);

    const fetchData = async () => {
        setLoading(true)
        let randomUsers: Array<User> = []
        await firestore()
            .collection('Users')
            .where("registeredUser", "==", true)
            .where("id", "!=", user?.id)
            .where("gender", "in", ["Prefer Not to Say", ...user?.genderPreferences])
            .get().then(async (usersArray) => {
                if (usersArray.size < 6) {
                    setNotEnoughUser(true)
                } else {
                    setNotEnoughUser(false)
                    while (randomUsers.length < 5) {
                        let randomIndex = generateRandomNumber(usersArray.size - 1)
                        let randomUser = usersArray.docs[randomIndex].data()
                        usersArray.docs.splice(randomIndex, 1)
                        try {
                            await getBase64FromUrl(randomUser?.imageUrl).then((result) => {
                                randomUser.imageUrl = result
                            })
                        } catch {
                            randomUser.imageUrl = "https://static.thenounproject.com/png/630737-200.png"
                        }
                        randomUsers.push(randomUser)
                    }
                }
            })
        // displayed user index chosen.
        let randomIndex = Math.floor(Math.random() * 5)
        setChosenUser(randomUsers[randomIndex])
        setNewUsers(randomUsers)
        setLoading(false)
    }

    const TextInside = (hint: string, number: number) => {
        return (
            <Text key={number} style={styles.text}>{number}.
                <Text style={styles.textInside}> {hint}</Text>
            </Text>
        )
    }

    const onClickChoose = async () => {
        setLoading(true)
        if (selectedUser === chosenUser?.id) {
            await firestore().collection('Users').doc(user?.id).update({
                attempts: user?.attempts + 1,
                correctGuess: user?.correctGuess + 1
            }).then(() => {
                setUser({
                    registeredUser: user?.registeredUser,
                    id: user?.id,
                    imageUrl: user?.imageUrl,
                    instagram: user?.instagram,
                    hints: user?.hints,
                    gender: user?.gender,
                    genderPreferences: user?.genderPreferences,
                    attempts: user?.attempts + 1,
                    correctGuess: user?.correctGuess + 1
                })
            }).finally(() => {
                setLoading(false)
                navigation.push('Congrats', { chosenUser: chosenUser })
            })
        } else {
            await firestore().collection('Users').doc(user?.id).update({
                attempts: user?.attempts + 1,
                correctGuess: user?.correctGuess
            }).then(() => {
                setUser({
                    registeredUser: user?.registeredUser,
                    id: user?.id,
                    imageUrl: user?.imageUrl,
                    instagram: user?.instagram,
                    hints: user?.hints,
                    gender: user?.gender,
                    genderPreferences: user?.genderPreferences,
                    attempts: user?.attempts + 1,
                    correctGuess: user?.correctGuess
                })
            }).finally(() => {
                setLoading(false)
                navigation.push("Wrong", { chosenUser: chosenUser, newUsers: newUsers })
            })
        }
    }

    const onClickScroll = () => {
        if (scrollDown) {
            scrollViewRef.current?.scrollTo({
                y: 0,
                animated: true,
            });
        } else {
            scrollViewRef.current.scrollToEnd({ animated: true })
        }
        setScrollDown(!scrollDown)
    }

    const Item = ({ item }: { item: User }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (selectedUser === item?.id) {
                        setSelectedUser(undefined)
                    } else {
                        setSelectedUser(item?.id)
                    }
                }}
                style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: item?.imageUrl }}
                />
                {selectedUser === item?.id ?
                    <View style={styles.iconContainer}>
                        <AntDesign
                            color={"white"}
                            name='like1'
                            size={15} />
                    </View>
                    : null
                }
            </TouchableOpacity>
        )
    }

    const FooterButton = () => {
        return (
            <View style={styles.buttonContainer}>
                {notEnoughUser ?
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.push("ProfileUpdate")}>
                        <Text style={styles.buttonText}>
                            GO TO PREFERENCES
                        </Text>
                    </TouchableOpacity>
                    :
                    selectedUser ?
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={onClickChoose}>
                            <Text style={styles.buttonText}>
                                CHOOSE
                            </Text>
                        </TouchableOpacity> :
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={onClickScroll}>
                            <Entypo name={scrollDown ? 'chevron-up' : 'chevron-down'} color={"white"} size={35} style={{ alignSelf: "center" }} />
                        </TouchableOpacity>
                }
            </View>
        )
    }

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <ImageBackground
                source={require("../../assets/Guess.jpg")}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                <LinearGradient
                    start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }}
                    colors={['rgba(255, 255, 255, 0.5)', 'rgba(0, 0, 0, 1)']}
                    style={styles.linearGradient}>
                    <View style={styles.mainView}>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            ref={scrollViewRef}
                            showsVerticalScrollIndicator={false}>
                            {
                                notEnoughUser ?
                                    <View style={styles.enoughUserTextView}>
                                        <Text style={styles.enoughUserText} >Apologies, there are not enough users matching your selected gender preference. Please consider expanding your gender preference.</Text>
                                    </View> :
                                    <>
                                        <ImageBackground
                                            source={require('../../assets/Notebook.png')}
                                            resizeMode="cover"
                                            style={styles.imageBackground}>
                                            {chosenUser?.hints.map((hint: string, index: number) => {
                                                return (TextInside(hint, index + 1))
                                            })}
                                        </ImageBackground>

                                        <Text style={styles.textBold}>
                                            Guess who <Text style={{ fontWeight: "normal" }}>belongs to hints?</Text>
                                        </Text>
                                        <Text>Please select a person to continue.</Text>

                                        <FlatList
                                            keyExtractor={(item) => item?.id}
                                            style={{ marginVertical: 20 }}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            data={newUsers}
                                            renderItem={({ item }) => <Item item={item} />}
                                        />
                                    </>
                            }
                        </ScrollView>
                        <FooterButton />
                    </View>
                </LinearGradient>
            </ImageBackground>
        )
    }
}

export default GuessScreen;