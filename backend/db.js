const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/";
const connectToMongo=async ()=>{
   
    await mongoose.connect(mongoURI);
    console.log("connected");
    //paper belna para bohot:-
    //pehle to nodemon was not working then package.json me script ke under we added start:nodemon index.js and then mongoose ka thora older version we installed(ie,instead of v8 we installed version 7.4 something) and then .connect method used to take callback and now it is not taking and so used then and catch but was showing problem in that also so now removed that and printed connected separately.
    
}
module.exports=connectToMongo;//this function exported