import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

export const save = async (key: string, value: any) => {
  await setItemAsync(key, value);
};

export const getValueFor = async (key: string) => {
  const res = await getItemAsync(key);
  if (res) {
    return res;
  } else {
    console.log('No values stored under that key.');
    return false;
  }
};

export const deleteValue = async (key: string) => {
  await deleteItemAsync(key);
};
