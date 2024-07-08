//index.js will be a express.js file
const connectToMongo=require('./db');
var cors = require('cors');//cores imported to connect grom forntend
connectToMongo();
//after this go to the express.js page and then ->Getting started->next Hello world->click there and copy the code
const express = require('express')
const app = express()
const port = 5000

app.use(cors())//after importing cors, it is used here.
//middleware used
app.use(express.json())//now i can send request in json
//Available routes
app.use('/api/auth',require('./routes/auth'))//for auth
app.use('/api/notes',require('./routes/notes'))//for notes


// Express' app.get() function lets you define a route handler for GET requests to a given URL. For example, the below code registers a route handler that Express will call when it receives an HTTP GET request to /test.
// If you receive a GET request with `url = '/test'`, always
// send back an HTTP response with body 'ok'.
// app.get('/test', function routeHandler(req, res) {
//   res.send('ok');
// });
app.get('/', (req, res) => {//request, response
  res.send('Hello Janhwi!')
})//'/' to write the path

app.listen(port, () => {
  console.log(`pustak backend listening on port ${port}`)
})