import { encrypt } from "../utils/ncrypt.js";
import { getAllWifi, getWifiById, newWifi } from "../repositories/wifiRepository.js";

export const newWifiService = async (title: string, password: string, name: string, userId: number) => {
    const passwordEncrypted = encrypt(password);
    const wifi: newWifi = {
        title,
        userId,
        password: passwordEncrypted,
        name
    };

    return wifi;
};

export const verifyAllWifi = async (userId: number) => {
    const wifi = await getAllWifi(userId);
    if (wifi == undefined) throw { status: 404, message: "Wi-fi not find" };
    return wifi;
};

export const verifyWifiService = async (id: number, userId: number) => {
    const wifi = await getWifiById(id);
    if (wifi == undefined) throw { status: 404, message: "Wi-fi not find" };

    if (wifi.userId !== userId) throw { status: 401, message: "Unauthorized: Another user's wi-fi" };
    return wifi;
};