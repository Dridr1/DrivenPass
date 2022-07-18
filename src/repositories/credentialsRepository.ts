import prisma from "../database.js";
import { credentials } from "@prisma/client";
import { decrypt } from "../utils/ncrypt.js";

export type newCredential = Omit<credentials, "id" | "creatAt">;

export const insert = async (credential: newCredential) => await prisma.credentials.create({ data: credential });


export const verifyCredential = async (title: string, userId: number) => {
    const credentialsInfos = await prisma.credentials.findFirst({ where: { title: { equals: title, mode: "insensitive" }, userId: userId } });
    return credentialsInfos;
};

export const getAllCredentials = async (userId: number) => {
    const credentials = await prisma.credentials.findMany({ where: { userId: userId } });
    if (credentials) {
        const credentialsList = credentials.map((credential) => {
            const passwordDecrypted = decrypt(credential.password);
            return ({ ...credential, password: passwordDecrypted });
        });
        return credentialsList;
    }
    return credentials;
};

export const getCredentialById = async (id: number) => {
    const credential = await prisma.credentials.findFirst({ where: { id: id } });
    if (credential) {
        const passwordDecrypted = decrypt(credential.password);
        const credentialInfos = { ...credential, password: passwordDecrypted };
        return credentialInfos;
    }
    return credential;
};

export const deleteCredential = async (id: number) => await prisma.credentials.delete({ where: { id: id } });