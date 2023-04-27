// We would like to use the db.js file in routes/index.js, therefore we would include it by writing the below 2 lines of code
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();

//At port=3000, my React app will run
//At port=5000, my backend will run
const port = 5000;
// Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
app.use(cors());

app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
app.use('/api/category',require('./routes/category'))
app.use('/api/transactions',require('./routes/transactions'))
// Available Routes
//app.use('/auth',require('./routes/auth'));
//app.use('/expense',require('./routes/expense_category'));
//app.use('/query',require('./routes/operations'));

app.listen(port, () => {
  console.log(`budgettrack backend listening at http://localhost:${port}`);
});