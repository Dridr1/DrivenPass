import { encrypt } from "../utils/ncrypt.js";
import * as cardsRepo from "../repositories/cardsRepository.js";

export interface cardFormat {
    title: string;
    number: string;
    name: string;
    cvc: string;
    password: string;
    type: string;
    expirationDate: string;
    isVirtual: boolean;
}

export const newCardService = async (cardData: cardFormat, userId: number) => {
    const validateCard = await cardsRepo.verifyCards(cardData.title, userId);

    if (validateCard != undefined)
        throw { status: 409, message: "Card in use" };

    const passwordEncrypted = encrypt(cardData.password);

    const cvcEncrypted = encrypt(cardData.cvc);

    const card: cardsRepo.newCard = {
        number: cardData.number,
        title: cardData.title,
        userId,
        name: cardData.name,
        cvc: cvcEncrypted,
        password: passwordEncrypted,
        type: cardData.type,
        expirationDate: cardData.expirationDate,
        isVirtual: cardData.isVirtual
    };

    return card;
};

export async function verifyAllCards(userId: number) {
    const cards = await cardsRepo.getAllCards(userId);
    if (cards == undefined) {
        throw { status: 404, message: "Cards not find" };
    }
    return cards;
}

export async function verifyCardService(id: number, userId: number) {
    const credential = await cardsRepo.getCardById(id);
    if (credential == undefined) {
        throw { status: 404, message: "Card not find" };
    }
    if (credential.userId !== userId) {
        throw { status: 401, message: "Unauthorized: Another user's card" };
    }
    return credential;
}