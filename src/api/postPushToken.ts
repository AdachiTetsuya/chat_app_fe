import { authAxios } from "./axios";
import { getValueFor } from "../hooks/useSecureStore";
import * as Notifications from 'expo-notifications';

export const postPushToken = async () => {
    const token = await getValueFor("accessToken");
    const pushToken = await Notifications.getExpoPushTokenAsync();
    
    // EAS で Build する場合は以下のようにする
    // const pushToken = await Notifications.getExpoPushTokenAsync({
    //     experienceId: '@username/letscode-py-quiz',
    // });

    console.log(pushToken)

    authAxios.post(
        "/question-and-answer/post-push-token/",
        {"token_value": pushToken},
        {headers: {"Authorization": `Bearer ${token}`}},
    )
}