import * as express from 'express';
import { buildSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import * as graphqlHTTP from 'express-graphql';
import { connectToDb } from './data';
import { Story, StoryReq } from './data/entities/Story';
import { getManager } from 'typeorm';
import { readFileSync } from 'fs';
import { join } from 'path'

async function main() {

    await connectToDb();
    const repo = getManager().getRepository(Story);
    const queryBuilder = getManager().createQueryBuilder(Story, "story");

    const resolvers = {
        Query: {
            getStories: async (parent: null, args: null, req: express.Request): Promise<Story[]> => {
                console.log('parent: ', parent)
                return req.queryBuilder
                    .where("story.privacy = :p1", { p1: 'public' })
                    .andWhere("story.likes > :p2", { p2: 20 })
                    .getMany();
            }
        },
        Mutation: {
            createStory: async (parent: null, args: { s: StoryReq }, req: express.Request): Promise<Story> => {
                const m = req.repo.create(args.s)
                return repo.save(m);
            }
        }
    }

    const schemaFile = join(__dirname, "schema.graphql");
    const typeDefs = readFileSync(schemaFile, "utf8");
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const app = express()

    app.use('/graphql', (req, res, next) => {
        req.queryBuilder = queryBuilder;
        req.repo = repo
        next()
    })

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.listen(3000, () => console.log('listening on 3000'))
}

main()
    .catch(err => {
        console.error(err)
        process.exit(1)
    })

