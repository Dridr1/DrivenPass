import prisma from "../database.js";
import { users } from "@prisma/client";

export type newUser = Omit<users, "id" | "creatAt">

export const insert = async (user: newUser) => await prisma.users.create({ data: user });


export const verifyEmail = async (email: string) => {
    const userInfos = await prisma.users.findFirst({ where: { email: email } });
    return userInfos;
};