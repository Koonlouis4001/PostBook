import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: "posts",
    database: "web_database",
    orderBy: {
        id: "DESC",
    },
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string

  @Column({ type: 'timestamp with time zone'})
  created: Date;

  @Column({ type: 'timestamp with time zone'})
  modified: Date;

  @Column({ type: 'int' })
  likes: number;
}
