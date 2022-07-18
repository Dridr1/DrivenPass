import prisma from "../database.js";
import { notes } from "@prisma/client";
import { decrypt } from "../utils/ncrypt.js";

export type newNotes = Omit<notes, "id" | "creatAt">;

export const insert = async (note: newNotes) => await prisma.notes.create({ data: note });


export const verifyNote = async (title: string, userId: number) => {
    const noteInfos = await prisma.notes.findFirst({ where: { title: { equals: title, mode: "insensitive" }, userId: userId } });
    return noteInfos;
};

export const getAllNotes = async (userId: number) => {
    const notes = await prisma.notes.findMany({ where: { userId: userId } });
    if (notes) {
        const notesList = notes.map((note) => {
            const textDecrypted = decrypt(note.text);
            return ({ ...note, text: textDecrypted });
        });
        return notesList;
    }
    return notes;
};

export const getNoteById = async (id: number) => {
    const note = await prisma.notes.findFirst({ where: { id: id } });
    if (note) {
        const textDecrypted = decrypt(note.text);
        const noteInfos = { ...note, text: textDecrypted };
        return noteInfos;
    }
    return note;
};

export const deleteNote = async (id: number) => await prisma.notes.delete({ where: { id: id } });