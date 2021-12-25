import { getManager } from "typeorm"
import { UserEntity } from "../entitys/User"

export const getUser = async (token: string): Promise<UserEntity> => {
    try {
        const user = await getManager().createQueryBuilder(UserEntity, 'user')
            .where('user.token = :token', {token})
            .getOneOrFail();

        return user;
    } catch (e) {
        return null;
    }
}