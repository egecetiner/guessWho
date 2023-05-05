import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { ImageSourcePropType } from "react-native";

export type SlideProps = {
    item: {
        id: string,
        image: ImageSourcePropType,
        title: string,
        subtitle: string
    }
};

export type User = {
    documentIndex: number,
    hints: Array<string>,
    id: string,
    imageUrl: string,
    instagram: string
} | FirebaseFirestoreTypes.DocumentData | undefined