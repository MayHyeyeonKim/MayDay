const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const indexRouter = require("./routes/index")

const app = express()

require("dotenv").config()
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/api", indexRouter)

// const mongoURI = process.env.LOCAL_DB_ADDRESS;
const mongoURI = process.env.MONGODB_URI_PROD;

mongoose
.connect(mongoURI)
.then(()=>console.log("mongoDB connected"))
.catch((err)=>console.log("DB connection fail", err));

// app.listen(process.env.PORT || 5050, ()=>{
app.listen(process.env.PORT || "https://mayday-1tq5.onrender.com", ()=>{

    console.log("server on");
})

