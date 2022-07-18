import ncrypt from "ncrypt-js";

const ncryptObj = new ncrypt(process.env.SECRET_KEY || "POG :)");

export const encrypt = (message: string) => {
    const messageEncrypted: string = ncryptObj.encrypt(message);
    return messageEncrypted;
};

export const decrypt = (message: string) => {
    const messageDecrypted: string = ncryptObj.decrypt(message);
    return messageDecrypted;
};