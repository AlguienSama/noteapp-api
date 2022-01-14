import { getManager } from "typeorm"
import { NoteEntity } from "../entitys/Note";
import { UserEntity } from "../entitys/User"

export const getUserById = async (id: string): Promise<UserEntity> => {
    return await getManager().findOne(UserEntity, id);
}

export const getUserByToken = async (token: string): Promise<UserEntity> => {
    return await getManager().createQueryBuilder(UserEntity, 'user')
        .leftJoinAndSelect('user.notes', 'notes', 'notes.is_deleted = :is_deleted', {is_deleted: false})
        .where('user.token = :token', {token})
        .addSelect('user.token')
        .addSelect('user.created_at')
        .getOne();
}

export const userExists = async (email:string): Promise<boolean> => {
    return await getManager().createQueryBuilder(UserEntity, 'user')
        .where('user.email = :email', { email })
        .getCount() === 1;
}

export const getNotes = async (user: UserEntity): Promise<NoteEntity[]> => {
    return await getManager().createQueryBuilder(NoteEntity, 'note')
            .leftJoinAndSelect('note.user', 'user')
            .where('note.user = :user', {user: user.id})
            .getMany();
}

export const getNote = async (user: UserEntity, note_id: string): Promise<NoteEntity> => {
    return await getManager().createQueryBuilder(NoteEntity, 'note')
            .leftJoinAndSelect('note.user', 'user')
            .where('note.id = :note_id', {note_id})
            .andWhere('note.user = :user', {user: user.id})
            .getOne();
}