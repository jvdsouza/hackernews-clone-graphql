const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');

const PORT = 4000;

const resolvers = {
        Query,
        Mutation,
        User,
        Link

    // Query: {
    //     info: () => {
    //         return `This is the API of a HackerNews clone`
    //     },
    //     // link: (parent, args) => {
    //     //     return links[args.id.slice(-1)]
    //     // }
    // },
    //     // updateLink: (parent, args) => {
    //     //     const linkToUpdate = links[args.id.slice(-1)]
    //     //     linkToUpdate.url = args.url
    //     //     linkToUpdate.description = args.description
    //     //     return linkToUpdate
    //     // },
    //     // deleteLink: (parent, args) => {
    //     //     const linkToDelete = links.splice(links[args.id.slice(-1)], 1)
    //     //     return linkToDelete[0]
    //     // }

    // // Link: { //graphql infers what the Link resolver looks like so 
    // //         //we dont need to have this here, but it's here for 
    // //         //future reference
    // //     id: (parent) => parent.id,
    // //     description: (parent) => parent.description,
    // //     url: (parent) => parent.url
    // // }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    },
})

server.start(() => console.log(`Server is running on port ${PORT}`))