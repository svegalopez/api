import * as express from 'express';
import { buildSchema } from 'graphql';
import * as graphqlHTTP from 'express-graphql';
import { connectToDb } from './data';
import { Story, StoryReq } from './data/entities/Story';
import { getManager } from 'typeorm';
import { readFile } from 'fs';

async function main() {

    await connectToDb();
    const repo = getManager().getRepository(Story);
    const queryBuilder = getManager().createQueryBuilder(Story, "story");

    const s = await readFileP('dist/schema.graphql')
    const schema = buildSchema(s);

    const app = express()

    const rootValue = {
        getStories: async (args: null, req: express.Request): Promise<Story[]> => {
            return req.queryBuilder
                .where("story.privacy = :p1", { p1: 'public' })
                .andWhere("story.likes > :p2", { p2: 20 })
                .getMany();
        },
        createStory: async (args: { s: StoryReq }, req: express.Request): Promise<Story> => {
            const m = req.repo.create(args.s)
            return req.repo.save(m);
        }
    }

    app.use('/graphql', (req, res, next) => { 
        req.queryBuilder = queryBuilder;
        req.repo = repo
        next()
    })

    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue,
        graphiql: true
    }))

    app.listen(3000, () => console.log('listening on 3000'))
}

function readFileP(p: string): Promise<string> {
    return new Promise((res, rej) => {
        readFile(p, (err, f) => {
            if(err) return rej(err)
            return res(f.toString())
        })
    })
}

main()
    .catch(err => {
        console.error(err)
        process.exit(1)
    })

