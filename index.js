const express = require('express')
const mongoose = require('mongoose');
const app = express()

const productRoute = require('./routes/product.route.js');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/products", productRoute);


mongoose.connect('mongodb://127.0.0.1:27017/user')
  .then(() => {
    console.log('Connected to database!');
    app.listen(3000, () =>{
        console.log("server runing port 3000");
    });
  })
  .catch(() => {
        console.log("Connecton failed!!!");

  });
