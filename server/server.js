const  mongoose=require('mongoose');
const dotenv =require('dotenv');
const app = require('./app');


dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>
    console.log("db connected")
).catch((error)=>{
    console.log("mongodb connection error",error)
});

const port = process.env.PORT || 5001;
app.listen(port ,()=>{
    console.log(`server running on port ${port}`);
})
