import prisma from "../database.js";
import { wifi } from "@prisma/client";
import { decrypt } from "../utils/ncrypt.js";

export type newWifi = Omit<wifi, "id" | "creatAt">;

export const insert = async (newWifi: newWifi) => await prisma.wifi.create({ data: newWifi });

export const getAllWifi = async (userId: number) => {
    const wifi = await prisma.wifi.findMany({ where: { userId: userId } });
    if (wifi) {
        const wifiList = wifi.map((wifi) => {
            const passwordDecrypted = decrypt(wifi.password);
            return ({ ...wifi, password: passwordDecrypted });
        });
        return wifiList;
    }
    return wifi;
};

export const getWifiById = async (id: number) => {
    const wifi = await prisma.wifi.findFirst({ where: { id: id } });
    if (wifi) {
        const passwordDecrypted = decrypt(wifi.password);
        const wifiInfos = { ...wifi, password: passwordDecrypted };
        return wifiInfos;
    }
    return wifi;
};

export const deleteWifi = async (id: number) => await prisma.wifi.delete({ where: { id: id } });