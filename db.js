

const mongoose = require('mongoose');

const mongoURI =
  "mongodb+srv://mitaligadiya07:z0014Y3hDK912ZXe@cluster0.pqphljn.mongodb.net/budgettracker?retryWrites=true&w=majority";

const connectToMongo = async () => {
 mongoose.connect(mongoURI, await console.log("Connected to mongo Successful")
    );
}

module.exports = connectToMongo;

