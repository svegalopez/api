# gql-example

An example graphql server. Refer to the data-migration-tool [docs](https://github.com/svegalopez/data-migration-tool#csv-to-database). <br>
Once the data has been migrated and you have created a ```.env``` file with your config, you can start this server:
```
$ npm install && npm start
```

Open you browser to localhost:3000/graphql. You will be able to perform a query and a mutation.
The query results shown below (all public stories, with > 20 likes) :

![query results](https://raw.githubusercontent.com/svegalopez/gql-example/master/screenshots/query.png "query results")

And a mutation to insert a story:

![query results](https://raw.githubusercontent.com/svegalopez/gql-example/master/screenshots/query.png "query results")




