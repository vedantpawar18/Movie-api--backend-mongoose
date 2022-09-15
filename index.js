const express= require("express");
const {connection, MovieModel}= require("./movies.js");
const app= express();
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Movies Home Page")
})

app.get("/movies", async(req,res)=>{
    var idparam = req.query.title_sort
    var movieparam=req.query.q
    if(movieparam)
    {
        console.log(movieparam)
        var results=await MovieModel.find({title: { '$regex': movieparam, '$options': 'i' }}, {})
    }
    if(idparam=="asc")
    {
        var results= await MovieModel.find().sort({"rating":1})
    }
    if(idparam=="dsc")
    {
        var results= await MovieModel.find().sort({"rating":-1})
    }
   
    res.send(results)
})

app.post("/addmovie", async(req,res)=>{
    const {id, title, actor, year, rating}=req.body;
    const new_movie= new MovieModel({
        id, 
        title, 
        actor, 
        year, 
        rating
    })
    await new_movie.save()
    res.send("Your data added successfully")
})

app.put("/movies/:id",async (req,res)=>{
    const {id, title, actor, year, rating}=req.body;
    var idparam = req.params["id"]
    await MovieModel.updateOne({id:idparam},{$set:{id:id, title:title, actor:actor, year:year, rating:rating}})
    res.send("post updated")
})

app.delete("/movies/:id", async(req,res)=>{
    var id = req.params["id"]
    await MovieModel.deleteOne({id:id})
    res.send("product deleted")
})



app.listen(8080, async()=>{
    try{
        await connection;
        console.log("Connected to DB successfully")
    }
    catch{
        console.log("connectiong to db error")
    }
    console.log("listening to 8080");
})