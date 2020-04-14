const express = require('express');
const bodyParser = require('body-parser');
const useRoutes = require('./routes/routes');
const dbConnect = require('./db/mongoDB');
const cors = require('cors');

const app = express();

dbConnect();
app.use(bodyParser.json());
app.use(cors());
app.use(useRoutes);



app.listen(4000);