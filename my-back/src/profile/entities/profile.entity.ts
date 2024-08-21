import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "src/posts/entities/posts.entity";
import { User } from "src/user/entities/user.entity";
import { Expose } from "class-transformer";

@Entity({ name: 'profile' })
export class Profile {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ type: 'varchar', length: 100, name: 'profile_name' })
    @Expose()
    profileName: string;

    @Column({ type: 'varchar', length: 300, name: 'profile_status' })
    @Expose()
    profileStatus: string;

    @Column({ type: 'timestamp with time zone', name: 'created' })
    @Expose()
    created: Date;

    @Column({ type: 'timestamp with time zone', name: 'last_modified' })
    @Expose()
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
