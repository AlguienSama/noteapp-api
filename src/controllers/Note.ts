import { Request, Response } from "express";
import { NoteEntity } from '../entitys/Note';
import response from '../utils/httpResponses';
import { getUserById } from "../utils/querys";
import VarTypes from '../utils/variableTypes';

class Note {

    static create = async (req: Request, res: Response) => {
        let { title, content, remind, color, view_format } = req.body;
        
        remind = VarTypes.correctNum(remind);
        color = VarTypes.correctHexColor(color);
        
        try {

            let user_id:string = req.headers.user_id.toString();
            const user = await getUserById(user_id);

            const note = new NoteEntity();
                note.title = title;
                note.content = content;
                note.remind = new Date(remind);
                note.color = color;
                note.view_format = view_format;
                note.user = user;
            note.save().then(() => {
                response(res, "CREATED", {note})
            }).catch((e) => {
                response(res, "BAD_REQUEST");
            });
        } catch (e) {
            response(res, "BAD_REQUEST");
        }
        
        
    }
}

export default Note;