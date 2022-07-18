import * as userRepo from "../repositories/userRespositorie.js";
import * as bcrypt from "../utils/bcypt.js";
import * as sessionRepo from "../repositories/sessionRepositories.js";
import tokenGenerator from "../utils/token.js";

interface User {
    email: string;
    password: string;
}

export const newUserService = async (newUserData: User) => {
    if (await userRepo.verifyEmail(newUserData.email) !== undefined)
        throw { status: 409, message: "Email in use" };

    const encryptedPassword = bcrypt.encrypt(newUserData.password);

    const user: userRepo.newUser = {
        email: newUserData.email,
        password: encryptedPassword
    };

    return user;
};

export const signInService = async (userData: User) => {
    const validatedUser = await userRepo.verifyEmail(userData.email);
    if (validatedUser === undefined)
        throw { status: 404, message: "User or password doesn't match" };

    const encryptedPassword = validatedUser?.password;
    
    bcrypt.verifyPassword(userData.password, encryptedPassword || "gambiarra :)");

    const userId = validatedUser?.id || 1; //Mais gambiarra :)
    const token = tokenGenerator(userId || 1, userData.email);

    const session : sessionRepo.newSession = {
        userId,
        token
    };

    return session;
};