import { HomeScreenProps as Props } from "../../types";
import { Alert, StyleSheet, Dimensions, View, Text, Pressable, Linking, TouchableOpacity } from 'react-native';
import { deleteValue } from "../hooks/useSecureStore";

import * as dg from "../constants/design-variables";
import { useEffect, useState, useContext } from "react";
import { UserInfoContext } from "../provider/UserInfoProvider";
import { isResHaveLoginRequired } from "../utils/utils";


export const Home: React.FC<Props> = ({ navigation }: Props) => {

    const { setUser } = useContext(UserInfoContext);

    const createTwoButtonAlert = () => {
        Alert.alert(
            "ログアウトしますか？","",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: async () => {
                    await deleteValue("accessToken")
                    await deleteValue("refreshToken")
                    .then(() => {
                        setUser((prev) => ({
                            ...prev,
                            isLoggedIn: false,
                        }))
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }}
            ]
        );
    }

	return (
        <>
            <View style={styles.topBorder}></View>
            <View style={styles.container}>

                <Pressable 
                    onPress={createTwoButtonAlert}
                    style={({pressed}) => [
                        {
                            backgroundColor: pressed ? dg.stateHoverBlack : 'white'
                        },
                        styles.actionBoardContent
                    ]}
                >
                    <Text style={styles.actionTitleLogout}>ログアウト</Text>
                </Pressable>
                            
            </View>
        </>
	)
}


const styles = StyleSheet.create({
	topBorder: {
		borderTopWidth: 1,
        borderTopColor: dg.border,
	},
    container: { 
        flex: 1,
        backgroundColor: dg.background,
    },
    actionBoard: {
        paddingTop: 20,
        alignItems: "center",
    },
    actionBoardContent: {
        width: 300,
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 15,
    },
    actionTitleLogout: {
        color: dg.primary,
        fontSize: 17,
        padding: 10,
    },
})