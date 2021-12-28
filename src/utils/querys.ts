import { getManager } from "typeorm"
import { NoteEntity } from "../entitys/Note";
import { UserEntity } from "../entitys/User"

export const getUserById = async (id: string): Promise<UserEntity> => {
    try {
        const user = await getManager().createQueryBuilder(UserEntity, 'user')
            .where('user.id = :id', {id})
            .getOneOrFail();

        return user;
    } catch (e) {
        return null;
    }
}

export const getUserByToken = async (token: string): Promise<UserEntity> => {
    try {
        const user = await getManager().createQueryBuilder(UserEntity, 'user')
            .leftJoinAndSelect('user.notes', 'notes')
            .where('user.token = :token', {token})
            .addSelect('user.token')
            .addSelect('user.created_at')
            .getOneOrFail();

        return user;
    } catch (e) {
        return null;
    }
}

export const getNotes = async (user_id: string): Promise<NoteEntity[]> => {
    try {
        const notes = await getManager().createQueryBuilder(NoteEntity, 'note')
            .where('note.user = :user_id', {user_id})
            .andWhere('is_deleted = false')
            .getMany();
        
        return notes;
    } catch (e) {
        return null;
    }
}