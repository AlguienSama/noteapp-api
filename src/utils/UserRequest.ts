import { Request } from 'express';
import { UserEntity } from '../entitys/User';

interface UserRequest extends Request {
    user: UserEntity
}

export default UserRequest;