const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
  type User {
    _id: ID
    email: String
    password: String
    contacts: [Contact]
    planets: [Planet]
  }
  type Contact {
    _id: ID
    contactName: String
    contactText: String
    parentPlanet: String
    contactAuthor: String
  }




  type Planet {
    _id: ID
    planetName: String
    planetAuthor: String
  }
  
  type Query {
    users: [User]
    user(email: String): User
    contacts: [Contact]
    planets: [Planet]
    me: User
  }
  type Mutation {
    addUser( email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addContact(contactText: String!, contactName: String!, parentPlanet: String): Contact
    updateContact(_id: ID!, contactText: String!, contactName: String!, parentPlanet: String): Contact
    addPlanet(planetName: String!): Planet
    deleteContact(_id: ID!): Contact
    deletePlanet(planetId: ID!): Planet
  }
`

module.exports = typeDefs;