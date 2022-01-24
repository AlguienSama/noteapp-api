import { Request, Response } from "express";
import { getManager } from "typeorm";
import { NoteEntity } from '../entitys/Note';
import response from '../utils/httpResponses';
import { getNote, getNotes, getUserById } from "../utils/querys";
import UserRequest from "../utils/UserRequest"
import VarTypes from '../utils/variableTypes';

class Note {

    static get = async (req: UserRequest, res: Response) => {
        try {
            const notes = await getNotes(req.user);

            response(res, "OK", {notes});
        } catch (e) {
            response(res, "UNAUTHORIZED");
        }
    }

    static getById = async (req: UserRequest, res: Response) => {
        const id = req.params.id;

        try {
            const note = await getNote(req.user, id);

            response(res, "OK", {note});
        } catch (e) {
            response(res, "UNAUTHORIZED");
        }
    }

    static create = async (req: UserRequest, res: Response) => {
        let { title, content, remind, color, view_format } = req.body;
        const user = req.user;
        
        remind = VarTypes.correctNum(remind);
        color = VarTypes.correctHexColor(color);
        
        try {
            const note = getManager().create(NoteEntity, {
                title, content, remind: new Date(remind), color, view_format, user
            });
            note.save().then(() => {
                response(res, "CREATED", {note})
            }).catch((e) => {
                response(res, "BAD_REQUEST");
            });
        } catch (e) {
            response(res, "BAD_REQUEST");
        }
    }

    static edit = async (req: UserRequest, res: Response) => {
        let { title, content, remind, is_pinned, priority, color, view_format } = req.body;
        const id = req.params.id;

        try {
            const note = await getNote(req.user, id);
                note.title = title || note.title;
                note.content = content || note.content;
                note.remind = new Date(VarTypes.correctNum(remind)) || note.remind;
                note.is_pinned = is_pinned ? true : false;
                note.priority = priority || note.priority;
                note.color = VarTypes.correctHexColor(color) || note.color;
                note.view_format = view_format || note.view_format;
            note.save().then(() => {
                response(res, "OK", {note})
            }).catch((e) => {
                response(res, "UNAUTHORIZED");
            });
        } catch (e) {
            response(res, "UNAUTHORIZED");
        }
    }

    static delete =async (req: UserRequest, res: Response) => {
        const id = req.params.id;
        const user = req.user;

        try {
            const note = await getManager().update(NoteEntity, { id, user, is_deleted: false }, { is_deleted: true });
            
            note.affected == 1 ? response(res, "OK") : response(res, "UNAUTHORIZED");
        } catch (e) {
            response(res, "UNAUTHORIZED");
        }
    }
}

export default Note;