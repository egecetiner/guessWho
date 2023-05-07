import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { User } from '../../utils/Types';
import styles from './styles';
import Loading from '../../utils/Loading';
import { UserContext } from '../../context/UserContext';
import { getBase64FromUrl, generateRandomNumber } from '../../utils/UsefulFunctions'

const GuessScreen = ({ navigation, route }: any) => {
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [chosenUser, setChosenUser] = useState<User>(undefined);
    const [newUsers, setNewUsers] = useState<Array<User>>();
    const [selectedUser, setSelectedUser] = useState<User>(undefined)

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
    }, []);

    const fetchData = async () => {
        setLoading(true)
        const documentSize = await (await firestore().collection('Users').get()).size
        let randomUsers: Array<User> = []

        while (randomUsers.length < 5) {
            try {
                let randomIndex = generateRandomNumber(documentSize - 1, [user?.documentIndex, ...randomUsers.map(user => user?.documentIndex)])
                let randomUser = await (((await firestore()
                    .collection('Users')
                    .where("documentIndex", "==", randomIndex)
                    .get()).docs[0])).data()

                await getBase64FromUrl(randomUser?.imageUrl).then((result) => {
                    randomUser.imageUrl = result
                })

                randomUsers.push(randomUser)
            } catch {
                continue;
            }
        }
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

    const onClickChoose = () => {
        if (selectedUser === chosenUser?.id) {
            navigation.push('Congrats', { chosenUser: chosenUser })
        } else {
            navigation.push("Wrong", { chosenUser: chosenUser, newUsers: newUsers })
        }
    }

    const Item = ({ item }: { item: User }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedUser(item?.id)
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

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <View style={styles.mainView}>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <ImageBackground
                        source={require('../../assets/Notebook.png')}
                        resizeMode="cover"
                        style={styles.imageBackground}>
                        {chosenUser?.hints.map((hint: string, index: number) => {
                            return (TextInside(hint, index + 1))
                        })}
                    </ImageBackground>

                    <Text style={styles.textBold}>Guess who
                        <Text style={{ fontWeight: "normal" }}> belongs to hints?</Text>
                    </Text>

                    <FlatList
                        keyExtractor={(item) => item?.id}
                        style={{ marginVertical: 20 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={newUsers}
                        renderItem={({ item }) => <Item item={item} />}
                    />
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={
                            styles.btn
                        }
                        disabled={!selectedUser}
                        onPress={onClickChoose}>
                        <Text
                            style={styles.buttonText}>
                            CHOOSE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default GuessScreen;