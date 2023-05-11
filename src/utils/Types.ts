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

export type Gender = "Male" | "Female" | "Non-Binary/Other" | "Prefer Not to Say"

export type User = {
    hints: Array<string>,
    id: string,
    imageUrl: string,
    instagram: string,
    genderPreferences: Array<Gender>,
    gender: Gender
} | FirebaseFirestoreTypes.DocumentData | undefined

export type HintRouteParams = {
    instagram: string,
    imagePath: string,
    imageBase64: string,
    gender: Gender,
    genderPreferences: Array<Gender>
}