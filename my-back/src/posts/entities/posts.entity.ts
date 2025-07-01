import { Expose, Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { profile } from "console";
import { Profile } from "../../profile/entities/profile.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";

@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ type: 'varchar', length: 1000, name: 'title' })
    @Expose()
    title: string;

    @Column({ type: 'timestamp with time zone', name: 'created' })
    @Expose()
    created: Date;

    @Column({ type: 'timestamp with time zone', name: 'last_modified' })
    @Expose()
    modified: Date;

    @Column({ type: 'int', name: 'likes' })
    @Expose()
    likes: number;

    @ManyToOne(() => Profile, (profile: Profile) => profile.posts, {
        orphanedRowAction: 'delete',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true
      })
    @JoinColumn({ name: 'profile_fk' })
    @Expose()
    profile: Profile; 

    @Column({type: 'bytea',nullable: true})
    picture: Buffer;
}

