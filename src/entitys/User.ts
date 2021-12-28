import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { NoteEntity } from "./Note";
dotenv.config();

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: bigint;

    @Column("varchar", {length: 255, select: false})
    token: string;

    @Column("varchar", {length: 255, unique: true})
    email: string;

    @Column("varchar", {length: 25})
    nickname: string;

    @Column("varchar", {length: 255, select: false})
    password: string;

    @Column("varchar", {length: 255, nullable: true})
    avatar: string;

    @OneToMany(() => NoteEntity, note => note.user)
    notes: NoteEntity[];

    @CreateDateColumn({select: false})
    created_at: Date;

    @UpdateDateColumn({select: false})
    last_at: Date;

    async comparePassword(candidate: string): Promise<boolean> {
        return bcrypt.compareSync(candidate, this.password);
    }

    async setPasswrord(password: string): Promise<void> {
        const salt = bcrypt.genSaltSync(parseInt(process.env["SALT_WORK_FACTOR"]));
        const hash = bcrypt.hashSync(password, salt);
        this.password = hash;
    }

    async generateJWT(expiresIn?: string | number): Promise<string> {
        if (expiresIn === undefined) {expiresIn = process.env["JWT_EXPIRATION"];}
        if (!this.id) {return;}
        this.token = jwt.sign({user_id: this.id}, process.env["JWT_ENCRYPTION"], {expiresIn});
    }

    @BeforeInsert()
    async registerToken() {
        if (this.token === undefined) {this.token = 'register';}
    }

}