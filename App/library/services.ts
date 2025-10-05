import AsyncStorage from "@react-native-async-storage/async-storage";

export const setid = async (id: any) => {
    await AsyncStorage.setItem("id", id)
}

export const getid = async () => {
    const id = await AsyncStorage.getItem("id")
    return id
}

export const deleteid = async () => {
    await AsyncStorage.removeItem("id")
}