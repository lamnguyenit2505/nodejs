const mongoose = require('mongoose')

const uri = "mongodb+srv://lamnk:Maichi.2505@cluster0.bssuo.mongodb.net/db_lamnk?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, { useFindAndModify: false })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

