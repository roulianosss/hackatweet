const mongoose = require('mongoose');

const connectionString =mongodb+srv://olivus:CGshpbIrui4dmM3O@cluster0.zsw9eh4.mongodb.net/hackatweet?retryWrites=true&w=majority

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
