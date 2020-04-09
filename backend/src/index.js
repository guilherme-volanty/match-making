const express = require('express');
const useRoutes = require('./routes/routes');
// const fileObservable = require('./services/fileObservable')


const app = express();

app.use(useRoutes);



app.listen(3000);