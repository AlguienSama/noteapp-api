import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import * as dotenv from "dotenv"
import { UserEntity } from "./User";
dotenv.config();

enum ViewFormat {
    PLAIN = "plain",
    HTML = "html",
    MD = "md"
}

@Entity({name: 'notes'})
export class NoteEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", {length: 255, nullable: true})
    title: string;

    @Column("text", {nullable: true})
    content: string;

    @Column("timestamp without time zone", {nullable: true})
    remind: Date;

    @Column("bool", {default: false})
    is_pinned: boolean;

    @Column("int", {nullable: true, default: 0})
    priority: number;

    @Column("varchar", {default: "#3498DB"})
    color: string;

    @Column("enum", {enum: ViewFormat, default: ViewFormat.HTML})
    view_format: ViewFormat;

    @ManyToOne(() => UserEntity, user => user.notes)
    user: UserEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    last_at: Date;

    @Column("bool", {default: false, select: false})
    is_deleted: boolean;
}