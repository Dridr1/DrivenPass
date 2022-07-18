import bcrypt from "bcrypt";

export const encrypt = (word: string) => {
    const wordHash = bcrypt.hashSync(word, 10);
    return wordHash;
};

export const verifyPassword = (password: string, passwordEncrypted: string) => {
    if (!bcrypt.compareSync(password, passwordEncrypted)) throw { status: 404, message: "Worng password" };
};