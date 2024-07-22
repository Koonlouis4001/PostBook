import { profile } from "console";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";

@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, name: 'title' })
    title: string;

    @Column({ type: 'timestamp with time zone', name: 'created' })
    created: Date;

    @Column({ type: 'timestamp with time zone', name: 'last_modified' })
    modified: Date;

    @Column({ type: 'int', name: 'likes' })
    likes: number;

    @ManyToOne(() => Profile, (profile) => profile.posts, {
        orphanedRowAction: 'delete',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true
      })
    @JoinColumn({ name: 'profile_fk' })
    profile: Profile; 
}

