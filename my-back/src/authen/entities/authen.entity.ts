import { Expose, Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { profile } from "console";
import { Profile } from "src/profile/entities/profile.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";

@Entity({ name: 'authentication' })
export class Authen {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ type: 'varchar', length: 300, name: 'refresh_token' })
    @Expose()
    refreshToken: string;

    @Column({ type: 'timestamp with time zone', name: 'expire_at' })
    @Expose()
    expireAt: Date;

    @Column({ type: 'int', name: 'likes' })
    @Expose()
    userId: number;

    @ManyToOne(() => User, (user: User) => user.id, {
        orphanedRowAction: 'delete',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    @JoinColumn({ name: 'userId' })
    @Expose()
    user: User;
}

