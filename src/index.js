const {GraphQLServer} = require('graphql-yoga');

const PORT = 4000;

let links = [{
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    },
    {
        id: 'link-1',
        url: 'www.google.com',
        description: 'yes'
    },
]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => {
            return `This is the API of a HackerNews clone`
        },
        feed: () => links,
        link: (parent, args) => {
            return links[args.id.slice(-1)]
        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const linkToUpdate = links[args.id.slice(-1)]
            linkToUpdate.url = args.url
            linkToUpdate.description = args.description
            return linkToUpdate
        },
        deleteLink: (parent, args) => {
            const linkToDelete = links.splice(links[args.id.slice(-1)], 1)
            return linkToDelete[0]
        }

    },
    Link: { //graphql infers what the Link resolver looks like so 
            //we dont need to have this here, but it's here for 
            //future reference
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on port ${PORT}`))