import * as notesRepo from "../repositories/notesRepository.js";
import { encrypt } from "../utils/ncrypt.js";

export const newNoteService = async (title: string, text: string, userId: number) => {
    const validateCredential = await notesRepo.verifyNote(title, userId);

    if (validateCredential != undefined) throw { status: 409, message: "Title in use" };

    const textEncrypted = encrypt(text);
    const note: notesRepo.newNotes = {
        title,
        text: textEncrypted,
        userId
    };

    return note;
};

export const verifyAllNotes = async (userId: number) => {
    const notes = await notesRepo.getAllNotes(userId);
    if (notes == undefined) throw { status: 404, message: "Notes not find" };
    return notes;
};

export const verifyNoteService = async (id: number, userId: number) => {
    const note = await notesRepo.getNoteById(id);
    if (note == undefined) throw { status: 404, message: "Note not find" };
    if (note.userId !== userId) throw { status: 401, message: "Unauthorized: Another user's note" };
    return note;
};