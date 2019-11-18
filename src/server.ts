import * as express from 'express';
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
            getStories: (parent: undefined, args: {}, req: express.Request): Promise<Story[]> => {
                return req.queryBuilder
                    .where("story.privacy = :p1", { p1: 'public' })
                    .andWhere("story.likes > :p2", { p2: 20 })
                    .getMany();
            }
        },
        Mutation: {
            createStory: (parent: undefined, args: { s: StoryReq }, req: express.Request): Promise<Story> => {
                const m = req.repo.create(args.s)
                return repo.save(m);
            }
        },
        Story : {
            launchDate : (parent: Story, args: any, req: any): string => {
                console.log('parent', parent)
                console.log('args', args)
                return parent.launchDate
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

