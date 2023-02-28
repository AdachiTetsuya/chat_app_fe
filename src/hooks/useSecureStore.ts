import { isAvailableAsync, setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";
import React from "react";

export const save = async (key: string, value: any) => {
    await setItemAsync(key, value);
}

export const getValueFor = async (key: string) => {
    let res = await getItemAsync(key);
    if (res){
        return res;
    } else {
        console.log("No values stored under that key.");
        return false;
    }
}

export const deleteValue = async (key: string) => {
    await deleteItemAsync(key);
}
