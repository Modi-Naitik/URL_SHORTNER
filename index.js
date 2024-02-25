const express = require('express');
const app = express();
const { connectToMongoDB } = require('./connect');
const urlRout = require('./routes/url');
const port = 3030;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log("mongoDB connected"));

app.use(express.json());
app.use("/url", urlRout);

app.listen(port,()=> console.log(`Server is run on port:${port}`));
