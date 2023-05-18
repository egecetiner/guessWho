import React, { useContext } from "react"
import { TouchableOpacity, StyleSheet, Text } from "react-native"
import Fontisto from "react-native-vector-icons/Fontisto"
import { AppContext } from "../context/AppContext"

type SkipHeaderRight = {
    onClickHeaderRight: () => void,
}

const SkipHeaderRight = ({ onClickHeaderRight }: SkipHeaderRight) => {
    const { colorScheme } = useContext(AppContext)

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center"
        },
        title: {
            fontSize: 17,
            color: colorScheme === "dark" ? "white" : "black"
        },
        icon: {
            fontWeight: "bold",
            marginRight: 4,
            marginLeft: 3,
            marginVertical: 12
        }
    })

    return (
        <TouchableOpacity style={styles.container} onPress={onClickHeaderRight}>
            <Text style={styles.title}>Skip</Text>

            <Fontisto
                color={colorScheme === "dark" ? "white" : "black"}
                name='angle-right'
                style={styles.icon}
                size={20} />
        </TouchableOpacity>
    )
}

export default SkipHeaderRight