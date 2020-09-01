const express = require('express')
const { Apollo, ApolloServer, gql } = require('apollo-server-express')
const cors = require('cors')
const dotEnv = require('dotenv')


// const { tasks, users } = require('./constants')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
    // set env variables
dotEnv.config()

const app = express()

// cors
app.use(cors())

// body parser middleware
app.use(express.json())

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

apolloServer.applyMiddleware({ app, path: '/graphql' })

const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
    res.send({ message: 'Hello' })
})

app.listen(PORT, () => {
    console.log(`listening on Port: ${PORT}`)
    console.log(`GraphQL Endpoint:${apolloServer.graphqlPath} `)
})