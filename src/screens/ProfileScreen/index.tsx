import React, { useContext, useEffect } from 'react';
import { ImageBackground, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import styles from './styles';
import { UserContext } from '../../context/UserContext';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = ({ navigation }: any) => {
    const { user } = useContext(UserContext)

    useEffect(() =>
        navigation.addListener('beforeRemove', (e: any) => {
            e.preventDefault();
        }),
        [navigation]);

    const TextInside = (hint: string, number: number) => {
        return (
            <Text key={number} style={styles.text}>{number}.
                <Text style={styles.textInside}> {hint}</Text>
            </Text>
        )
    }

    const onClickUpdate = () => {
        navigation.push('ProfileUpdate')
    }
    const onClickGuess = () => {
        navigation.jumpTo('GuessStack');
    }

    return (
        <ImageBackground
        source={require("../../assets/Profile.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <LinearGradient
          start={{ x: 0, y: 0.4}} end={{ x: 0, y: 1 }}
          colors={['rgba(255, 255, 255, 0.4)', 'rgba(0, 0, 0, 1)']}
          style={styles.linearGradient}>
        <View style={styles.mainView}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image
                        style={user?.imageUrl ? styles.image : styles.emptyImage}
                        source={user?.imageUrl ? { uri: user?.imageUrl } : require("../../assets/User.png")}
                    />
                </View>
                <Text style={styles.instaText}>{user?.instagram}</Text>
                <ImageBackground
                    source={require('../../assets/Notebook.png')}
                    resizeMode="contain"
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
                        [styles.btn, { marginLeft: 10 }]
                    }
                    onPress={onClickGuess}>
                    <Text
                        style={styles.buttonText}>
                        START GUESSING
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        </LinearGradient>
    </ImageBackground>
    );
}

export default ProfileScreen;
