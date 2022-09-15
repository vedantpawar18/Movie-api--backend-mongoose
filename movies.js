const mongoose= require("mongoose");

const connection = mongoose.connect("mongodb://127.0.0.1:27017/web18");

const MovieSchema= mongoose.Schema({
    id:Number,
    title:String,
    actor:String,
    year:Number,
    rating:Number
})

const MovieModel= mongoose.model("movie", MovieSchema)

module.exports={
    connection,
    MovieModel
}