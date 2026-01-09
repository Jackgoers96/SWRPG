const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const PlanetModel = require('./models/Planet');
require('dotenv').config();

// const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');

// const db = require('./config/connection');

// const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:3000/Planets");

app.listen(3001, () => {
  console.log("App is listening on port 3001")
})

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });

// server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());




if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get('Planets', (req, res) => {
  PlanetModel.find()
    .then(Planets => res.json(Planets))
    .catch(err => res.json(err))
});

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// });




// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { MongoClient } = require('mongodb');
// const proxy = require('http-proxy-middleware');

// const app = express();
// const port = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SWRPG');
// const client = new MongoClient(uri, { useNewUrlParser: true });


// if (process.env.NODE_ENV === 'production') {
//   // Serve static files from the React app
//   app.use(express.static(path.join(__dirname, 'client/build')));

//   // Handle requests that do not match your API routes (this should come after defining your API routes)
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// } else {
//   // If not in production, proxy requests to the React development server

//   app.use(
//     '/api', // Adjust the proxy route to match your API endpoints
//     proxy({
//       target: 'http://localhost:3000', // The address of your React development server
//       changeOrigin: true,
//     })
//   );
// }


// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Middleware
// app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
// app.use(bodyParser.json());

// // Define your Mongoose schema and models for your encyclopedia data


// app.get('/planets', async (req, res) => {
//   try {
//     await client.connect();
//     const collection = client.db('SWRPG').collection('Planets');
//     const planets = await collection.find({}).toArray();
//     res.json(planets);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch data' });
//   } finally {
//     await client.close();
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
