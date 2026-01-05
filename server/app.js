const express = require('express');
const cors=require("cors");
const app= express();
const userRouter = require('./routes/userRoutes')





app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/users",userRouter)




module.exports = app;