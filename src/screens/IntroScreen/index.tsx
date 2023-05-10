import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import slideData from './slideData';
import styles from './styles';
import { SlideProps } from '../../utils/Types';

const { width, height } = Dimensions.get('window');

const IntroScreen = ({ navigation }: any) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
    const ref: any = React.useRef();

    const Slide = ({ item }: SlideProps) => {
        return (
            <ImageBackground
                source={item?.image}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                <LinearGradient
                    colors={['#00000000', '#000000']}
                    style={styles.linearGradient}>
                    <View style={styles.slideContainer}>
                        <Text style={styles.title}>{item?.title}</Text>
                        <Text style={styles.subtitle}>{item?.subtitle}</Text>
                        <Footer />
                    </View>
                </LinearGradient>
            </ImageBackground>
        );
    };

    const updateCurrentSlideIndex = (e: any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slideData.length) {
            const offset = nextSlideIndex * width;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const onClickButton = () => {
        if (currentSlideIndex == slideData.length - 1) {
            navigation.push('Register', {})
        } else {
            goToNextSlide()
        }
    }

    const Footer = () => {
        return (
            <View
                style={styles.footerContainer}>
                <View
                    style={styles.indicatorContainer}>
                    {slideData.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentSlideIndex == index && {
                                    backgroundColor: "white",
                                    width: 40,
                                },
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={onClickButton}>
                    <Text
                        style={styles.buttonText}>
                        {currentSlideIndex == slideData.length - 1 ? "GET STARTED" : "NEXT"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ height }}
                horizontal
                data={slideData}
                pagingEnabled
                renderItem={({ item }) => <Slide item={item} />}
            />
        </View>
    );
}

export default IntroScreen;
