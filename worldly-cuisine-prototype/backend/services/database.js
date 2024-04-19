const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://derekpham:Cencieska4.@derek-iod-miniproject.jjekh8y.mongodb.net/";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbConnection;

async function connectToServer() {
    if (!dbConnection) {
        try {
            await client.connect();
            dbConnection = client.db("derek-iod-miniproject");
            console.log("Successfully connected to MongoDB Atlas!");
        } catch (err) {
            console.error("An error occurred connecting to MongoDB Atlas", err);
            throw err; 
        }
    }
    return dbConnection;
}

function getDb() {
    return dbConnection;
}

module.exports = { connectToServer, getDb };
