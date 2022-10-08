const express =require('express');
const app =express();
const cors =require('cors')
const port =process.env.PORT||5000;
const ObjectId =require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion,  } = require('mongodb');


//use middleware
app.use(cors());
app.use(express.json());

//user:rikouser
//password:zsIaHntenATorwzs


const uri = "mongodb+srv://rikouser:zsIaHntenATorwzs@cluster0.fc3dngw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const userCollection =client.db("foodExpress").collection("users");

        //load data
        app.get('/user',async(req,res)=>{
            const query ={};
            const cursor =userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })
        //post user :add a new user
        app.post('/user',async(req,res)=>{
            const newUser =req.body
            console.log('adding a new user',newUser);
            const result =await userCollection.insertOne(newUser);
            res.send(result)
        })

        //delete a user
        app.delete('/user/:id',async(req,res)=>{
             const id =req.params._id;
             const query ={_id: ObjectId(id)}
             const result =await userCollection.deleteOne(query);
             res.send(result);
        })
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir)


app.get('/',(req,res)=>{
    res.send('server is running okk vaiya')
})

app.listen(port,()=>{
    console.log('CRUD server is running');
})