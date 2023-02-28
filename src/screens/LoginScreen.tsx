import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from "react-native";
import { authAxios } from "../api/axios";
import { useContext, useState, useEffect } from "react";
import { LoginScreenProps } from "../../types";
import { useNavigation } from '@react-navigation/native';

import { UserInfoContext } from "../provider/UserInfoProvider";
import { save } from "../hooks/useSecureStore";
import { postPushToken } from "../api/postPushToken";
import * as dg from "../constants/design-variables"; 
import { TextInput } from 'react-native-paper';


const WindowWidth = Dimensions.get('window').width;

export const Login: React.FC<LoginScreenProps> = () => {

    const navigation = useNavigation();

    const [ email ,setEmail] = useState<string>(""); 
    const [ password, setPassword ] = useState<string>("");

    const [ errorMsg1, setErrorMsg1 ] = useState<string[]>([]);
    const [ errorMsg2, setErrorMsg2 ] = useState<string[]>([]);

    const { setUser } = useContext(UserInfoContext);

    // フィールドのバリデーション
    const checkFiledNotNull = () => {
        let result: boolean = false;
        if (email && password){ 
            result = true;
        }
        return result;
    }
    
    const onSubmit =  async () => {
        if(checkFiledNotNull()){
            await authAxios.post(
                "/dj-rest-auth/login/",
                {
                    email: email,
                    password: password
                },
            )
            .then((res): void => {
                console.log(res)
                if (res.status == 200){
                    console.log(res.data)
                    setUser({username: res.data.user.first_name, isLoggedIn: true});
                    save("accessToken", res.data.access_token);
                    save("refreshToken", res.data.refresh_token);
                }
            })
            .catch((err) => {
                const errorObj = err.response.data;
                switch(Object.keys(errorObj)[0]){
                    case "email":
                        setErrorMsg1(Object.values(errorObj));
                    break;
                    case "password":
                        setErrorMsg2(Object.values(errorObj));
                    break;
                    case "non_field_errors":
                        setErrorMsg2(["メールアドレスまたはパスワードが違います"]);
                    break;
                    default:
                        setErrorMsg2(["エラーがあります"]);
                }
            })
        } else { 
            email || setErrorMsg1(["このフィールドは必須です"]);
            password || setErrorMsg2(["このフィールドは必須です"]);
        }
    };

    useEffect(() => { 
        // Unmount 時の処理
        return () => { 
            postPushToken() 
        }
    }, []) 

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <View style={styles.content}>
                        <TextInput
                            onChangeText={setEmail}
                            error={Boolean(errorMsg1.length)}
                            onFocus={() => setErrorMsg1([])}

                            contextMenuHidden={true}
                            mode="outlined"
                            label="メールアドレス"
                            outlineColor={dg.border}
                            activeOutlineColor={dg.primary}
                            style={styles.input}
                            placeholderTextColor="rgba(0, 0, 0, 0.6)"
                        />
                        {<Text style={styles.errorMsg}>{errorMsg1}</Text>}
                        <TextInput
                            onChangeText={setPassword}
                            error={Boolean(errorMsg2.length)}
                            onFocus={() => setErrorMsg2([])}

                            contextMenuHidden={true}
                            mode="outlined"
                            label="パスワード"
                            outlineColor={dg.border}
                            activeOutlineColor={dg.primary}
                            style={styles.input}
                            placeholderTextColor="rgba(0, 0, 0, 0.6)"
                            secureTextEntry={true}
                        />
                        {<Text style={styles.errorMsg}>{errorMsg2}</Text>}
                        <TouchableOpacity 
                            style={[
                                styles.buttonContainer,
                                (checkFiledNotNull() && (!(errorMsg1.length || errorMsg2.length))
                                    ? {backgroundColor: dg.primary}: {})
                            ]} 
                            onPress={onSubmit}
                            activeOpacity={0.5}
                        >
                            <View style={styles.buttonTextWrap}>
                                <Text style={styles.buttonText}>ログイン</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {navigation.navigate("SignUp")}}
                            style={styles.signInButton}
                        >
                            <Text>アカウントをお持ちでない方はこちら</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: dg.background,
		flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: "90%",
    },
    logoWrap: {
        width: WindowWidth * 0.9,
        height: WindowWidth * 0.9 * 0.3,
        marginBottom: 30,
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 3,
        width: "100%",
        height: 45,
        backgroundColor: "white",
    },
    errorMsg: { 
        paddingLeft: 15,
        color: "#CC1436",
        fontSize: 12,
    },
    buttonContainer: {
        marginTop: 50,
        marginBottom: 20,
        borderRadius: 3,
        width: "100%",
        height: 50,
        backgroundColor: dg.disabledBlack,
        justifyContent: "center",
    },
    buttonTextWrap: {
        alignItems: "center",
    },
    buttonText: {
        fontSize: 15,
        color: dg.highEmphasisWhite,
    },
    message: {
        color: "red"
    },
    bottomText: {
        color: dg.midEmphasisBlack
    },
    signInButton: {
        paddingTop: 10,
    }
})