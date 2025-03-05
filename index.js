let express=require("express");
const { dbConnection } = require("./dbConnection");
const { ObjectId } = require("mongodb");
let app=express();


app.use(express.json())

app.get("/student-read",async (req,res)=>{
    let myDB=await dbConnection();
    res.send("Students view API")
    let studentCollection=myDB.collection("students")

    let data=await studentCollection.find().toArray();
    let resobj={
        status:1,
        msg:"Students List",

    }
})
app.post("/student-insert",async(req,res)=>{
    let myDB=await dbConnection();
    let studentCollection=myDB.collection("students")


    // let obj={
    //     sName:req.body.sName,
    //     sEmail:req.body.sEmail,
    // }
    let{sName, sEmail}=req.body;
    let obj={sName, sEmail}
    console.log(obj)
    
    let insertRes= await studentCollection.insertOne(obj)

    let resObj={
        status:1,
        msg:"Data insert",
        insertRes
        
    }
   
    res.send(resObj)
   
    console.log(Obj)
    res.send("students Insert API")
})

app.delete("/student-delete/:id",async (req,res)=>{
    let {id}=req.params;
    let myDB=await dbConnection();
    let studentCollection=myDB.collection("students")
    let delRes=await studentCollection.deleteOne({_id:new Object(id)})
    let resObj={
        status:1,
        msg:"Data Delete",
        delRes
    }
    res.send(resObj)
})

app.put("/student-update/:id",async(req,res)=>{
    let {id}=req.params;
    let {sName,sEmail}=req.body;
    let myDB=await dbConnection();
    let obj={sName,sEmail}
    let studentCollection=myDB.collection("students")
    let updateRes=await studentCollection.updateOne({_id:new ObjectId(id)},{$set:{sName,sEmail}})
    let resObj={
        status:1,
        msg:"Data Updated",
        updateRes
    }
    res.send(resObj)
    
})

app.listen("8000")