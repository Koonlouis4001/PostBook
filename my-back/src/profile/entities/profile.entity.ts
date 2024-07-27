import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/user/entities/user.entity";

@Entity({ name: 'profile' })
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, name: 'profile_name' })
    profileName: string;

    @Column({ type: 'varchar', length: 300, name: 'profile_status' })
    profileStatus: string;

    @Column({ type: 'timestamp with time zone', name: 'created' })
    created: Date;

    @Column({ type: 'timestamp with time zone', name: 'last_modified' })
    modified: Date;

    @OneToMany(() => Post, (post) => post.profile, {
        cascade: true,
        eager: true,
        nullable: true
      })
    @JoinColumn({name:'post_fk'})
    posts: Post[];

    @OneToOne(()=>User)
    @JoinColumn({name:'user_fk'})
    user: User;
}
