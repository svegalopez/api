import * as express from 'express';
import { buildSchema } from 'graphql';
import * as graphqlHTTP from 'express-graphql';
import { connectToDb } from './data';
import { Story, StoryReq } from './data/entities/Story';
import { getManager } from 'typeorm';

async function main() {

    await connectToDb();
    const repo = getManager().getRepository(Story);

    const schema = buildSchema(`

        enum Privacy {
            public
            private
        }

        type Story {
            id: Int!
            launchDate: String!
            title: String!
            privacy: Privacy!
            likes: Int!
        }

        input StoryReq {
            launchDate: String!
            title: String!
            privacy: Privacy!
            likes: Int!
        }
        
        type Query {
            getStories: [Story!]!
        }

        type Mutation {
            createStory(s: StoryReq!): Story!
        }
          
    `)

    const app = express()

    const rootValue = {
        getStories: async (args: null, req: express.Request): Promise<Story[]> => {
            return getManager()
                .createQueryBuilder(Story, "story")
                .where("story.privacy = :p1", { p1: 'public' })
                .andWhere("story.likes > :p2", { p2: 20 })
                .getMany();
        },
        createStory: async (args: { s: StoryReq }, req: express.Request): Promise<Story> => {
            const m = repo.create(args.s)
            return repo.save(m);
        }
    }

    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue,
        graphiql: true
    }))

    app.listen(3000, () => console.log('listening on 3000'))
}

main()
    .catch(err => {
        console.error(err)
        process.exit(1)
    })

