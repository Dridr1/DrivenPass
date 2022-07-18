import * as credentialRepo from "../repositories/credentialsRepository.js";
import { encrypt } from "../utils/ncrypt.js";

export const newCredentialService = async (title: string, password: string, username: string, url: string, userId: number) => {
    const validateCredential = await credentialRepo.verifyCredential(title, userId);

    if (validateCredential != undefined) throw { status: 409, message: "Title in use" };

    const passwordEncrypted = encrypt(password);
    const credential: credentialRepo.newCredential = {
        title,
        userId,
        username,
        url,
        password: passwordEncrypted
    };

    return credential;
};

export const verifyAllCredentials = async (userId: number) => {
    const credentials = await credentialRepo.getAllCredentials(userId);
    if (credentials == undefined) throw { status: 404, message: "Credentials not find" };
    return credentials;
};

export const verifyCredentialService = async (id: number, userId: number) => {
    const credential = await credentialRepo.getCredentialById(id);
    if (credential == undefined) throw { status: 404, message: "Credential not find" };
    if (credential.userId !== userId) throw { status: 401, message: "Unauthorized: Another user's credential" };
    return credential;
};