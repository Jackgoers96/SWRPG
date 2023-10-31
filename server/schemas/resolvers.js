const { AuthenticationError } = require('apollo-server-express');
const { User, Contact, Planet } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('planets');
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('planets');
    },
    // resolve planets
    planets: async (parent, args, context) => {
      // const params = email ? { email } : {};
      // return Folder.find(params).populate('snippets');
    if (context.user) {
        const planetInfo = await Planet.find({ planetAuthor: context.user.email })
        console.log(planetInfo)
        return planetInfo;
      }
      throw new AuthenticationError("You need to be logged in!");

    },
    planets: async (parent, { planetId }) => {
      return Planet.findOne({ _id: planetId }).populate('contacts');

    },
    // resolve snippets
    contacts: async (parent, args, context) => {

     
      const getContacts = Contact.find({contactAuthor: context.user.email})
      return getContacts
      
      
    },
    // snippet: async (parent, { snippetId }) => {
    //   return Snippet.findOne({ _id: snippetId });
    // },
    // What does me do?
    me: async (parent, args, context) => {
      console.log("context", context)
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('email/Password does not exists!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addPlanet: async (parent, { planetName }, context) => {
      if (context.user) {
        const planet = await Planet.create({
          planetName, 
          planetAuthor: context.user.email
        
        });

        return planet;
      }

     
      throw new AuthenticationError('You need to be logged in!');
      }
      
    ,
    addContact: async (parent, { contactName, contactText, parentPlanet }, context) => {
      if (context.user) {

        const newContact = await Contact.create(
         {
          contactAuthor: context.user.email,
          contactName,
          contactText,
          parentPlanet,

         
          });
      return newContact
      }
      throw new AuthenticationError('You need to be logged in!');

    },
    updateContact: async (parent, { _id, contacttName, contacttText, parentPlanet }, context) => {
      if (context.user) {
        const updatedContact = await Contact.findOneAndUpdate({_id: _id},
         {
          contacttName,
          contacttText,
          parentPlanet,
          });
      return updatedContact
      }
      throw new AuthenticationError('You need to be logged in!');

    },
    deletePlanet: async (parent, { planetId }, context) => {
      if (context.user) {

        const getPlanetInfo = await Planet.findOne({_id: planetId})
    
        const parentPlanetName = getPlanetInfo.PlanetName
        console.log(parentPlanetName)
        

        const planet = await Planet.findOneAndDelete({
          _id: planetId,

        });

      const deleteContacts = await Contact.remove({parentPlanet: parentPlanetName})
      console.log(deleteContacts)

      return planet;
      }
      
      
throw new AuthenticationError('You need to be logged in!');
    },
    deleteContact: async (parent, { _id }, context) => {
      // if (context.user) {


      await Contact.remove({_id: _id});
      
      return _id
    // 
    // }

    // throw new AuthenticationError('You need to be logged in!');
  }


  }



}
module.exports = resolvers;