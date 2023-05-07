import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { User } from '../../utils/Types';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const CongratsScreen = ({ navigation, route }) => {
    const { chosenUser }: { chosenUser: User } = route.params
    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        }),
        [navigation]);

    return (
        <ImageBackground
            source={require("../../assets/CongratsUser.webp")}
            style={styles.backgroundImage}
        >
            <LinearGradient
                start={{ x: 0, y: 0.6 }} end={{ x: 0, y: 1 }}
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                style={styles.linearGradient}>
                <View style={styles.mainView}>

                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: chosenUser?.imageUrl }}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.instagramHeadline}>Instagram</Text>
                            <Text style={styles.instagramText}>{chosenUser?.instagram}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={
                                styles.btn
                            }
                            onPress={() => {
                                navigation.push('Guess')
                            }
                            }>
                            <Text
                                style={styles.buttonText}>
                                CONTINUE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}

export default CongratsScreen;
