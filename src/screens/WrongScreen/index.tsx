import React, { useEffect } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { User } from '../../utils/Types';

const WrongScreen = ({ navigation, route }: any) => {
    const { chosenUser, newUsers }: { chosenUser: User, newUsers: Array<User> } = route.params

    useEffect(() =>
        navigation.addListener('beforeRemove', (e: any) => {
            e.preventDefault();
        }),
        [navigation]);

    return (
        <ImageBackground
            source={require("../../assets/WrongUser.jpg")}
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            <LinearGradient
                start={{ x: 0, y: 0.4 }} end={{ x: 0, y: 1 }}
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                style={styles.linearGradient}>
                <View style={styles.mainView}>
                    <Text style={styles.wrongText}>WRONG CHOICE</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={
                                styles.btn
                            }
                            onPress={() => {
                                navigation.push('Guess', { chosenUser: chosenUser, oldUsers: newUsers })
                            }
                            }>
                            <Text
                                style={styles.buttonText}>
                                TRY AGAIN
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                styles.btn
                            }
                            onPress={() => navigation.push('Guess')}>
                            <Text style={styles.buttonText}>
                                CONTINUE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}

export default WrongScreen;