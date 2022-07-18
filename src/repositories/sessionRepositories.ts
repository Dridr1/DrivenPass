import prisma from "../database.js";
import { sessions } from "@prisma/client";

export type newSession = Omit<sessions, "id" | "creatAt">

export const createSession = async (session: newSession) => {
    await prisma.sessions.create({ data: session });
};

export const verifySession = async (token: string) => {
    const sessionInfos = await prisma.sessions.findFirst({ where: { token: token } });
    return sessionInfos;
};