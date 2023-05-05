import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { User } from '../../utils/Types';
import styles from './styles';
import getBase64FromUrl from '../../utils/UsefulFunctions';
import Loading from '../../utils/Loading';

const GuessScreen = ({ navigation, route }: any) => {
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
        if (!route.params?.user) {
            fetchData()
        } else {
            setNewUsers(route.params.oldUsers)
            setChosenUser(route.params.user)
        }
    }, []);

    // last index included. 5 unique random numbers array.
    const generateRandomArray = (lastIndex: number) => {
        let randomNumberArr: any = [];
        while (randomNumberArr.length < 5) {
            let r = Math.floor(Math.random() * (lastIndex + 1))
            if (randomNumberArr.indexOf(r) === -1) randomNumberArr.push(r);
        }
        return randomNumberArr
    }

    const fetchData = async () => {
        setLoading(true)
        const documentSize = await (await firestore().collection('Users').get()).size
        const randomIndexes = generateRandomArray(documentSize - 1)
        let randomUsers: Array<User> = []

        for (let i = 0; i < randomIndexes.length; i++) {
            let randomUser = await (((await firestore()
                .collection('Users')
                .where("documentIndex", "==", randomIndexes[i])
                .get()).docs[0])).data()
            await getBase64FromUrl(randomUser.imageUrl).then((result) => {
                randomUser.imageUrl = result
            })
            randomUsers.push(randomUser)
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
            navigation.push('Congrats', { user: chosenUser })
        } else {
            navigation.push("Wrong", { user: chosenUser, newUsers: newUsers })
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
