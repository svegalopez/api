import * as express from 'express';
import { buildSchema } from 'graphql';
import * as graphqlHTTP from 'express-graphql';


const cats = [
    { id: 1, name: 'sam', age: 5 },
    { id: 2, name: 'john', age: 2 }
]

const stories = [
    {
        body: "in a land far away...",
        public: true,
        likes : [
            {
                code : 1
            },
            {
                code : 1
            },
            {
                code : 0
            }
        ]
    },
    {
        body: "once upon a time...",
        public: true,
        likes : [
            {
                code : 1
            },
            {
                code : 0
            },
            {
                code : 0
            }
        ]
    },
    {
        body: "there was a boy...",
        public: false,
        likes : [
            {
                code : 0
            },
            {
                code : 0
            },
            {
                code : 0
            }
        ]
    }
]

const schema = buildSchema(`
    type Like {
        code: Int!
    }
    type Story {
        body: String!
        public: Boolean!
        likes: [Like!]!
    }
    type Cat {
        id: Int!
        name: String!
        age: Int!
    }
    type Query {
        cat(id: Int!) : Cat!
        stories: [Story!]!
    }
`)

const app = express()

const rootValue = {
    cat: (args: { id: number }, req: express.Request) => {
        return cats.find(el => el.id === args.id)
    },
    stories: (args: null, req: express.Request) => {
        return stories.filter(el => {
            return el.public && (el.likes.filter(el => !!el.code )).length >= 1
        })
    }
}

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(3000, () => console.log('listening on 3000'))

