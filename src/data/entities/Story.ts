import { Column, Entity, PrimaryGeneratedColumn, AfterLoad } from 'typeorm';

enum Privacy {
    private = "private",
    public = "public"
}

@Entity({
    name: 'stories',
})
export class Story {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'launch_date' })
    launchDate!: string

    @Column({type: 'varchar', length: '1024' })
    title!: string

    @Column({ type: 'varchar', length: '32' })
    privacy!: Privacy

    @Column()
    likes!: number
}

export type StoryReq = Omit<Story, "id">

