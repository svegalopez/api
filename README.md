# gql-example

An example graphql server. Refer to the data-migration-tool [docs](https://github.com/svegalopez/data-migration-tool#csv-to-database) to create the database and insert the dataset. <br>
Once the data has been migrated and you have created a ```.env``` file with your [config](https://github.com/svegalopez/data-migration-tool#db-configuration), you can start this server:
```
$ npm install && npm start
```

If you are using vscode, make sure to use the workspace version of typescript and not vscode's version. This is because we are using one of the latest features "Omit" and vscode's version might not support it.

Open you browser to localhost:3000/graphql. You will be able to perform a query and a mutation.
The query results shown below (all public stories, with > 20 likes) :

![query results](https://raw.githubusercontent.com/svegalopez/gql-example/master/screenshots/query.png "query results")

And a mutation to insert a story:

![mutation result](https://raw.githubusercontent.com/svegalopez/gql-example/master/screenshots/mutation.png "mutation result")


# Comments

I had never used graphql before, and I think its awesome. Im sure there's much to learn about it and I would be excited to do it. I was able to setup this basic example with no problem, open to feedback!
