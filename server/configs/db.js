import mongoose from "mongoose";

const connectDb = async() => {
    try{
        mongoose.connection.on("connected",()=>{console.log("Database connected Successfully")})

        let mongodbURI = process.env.MONGODB_URI;
        const projectName = "resume-builder";
        if(!mongodbURI){
            throw new Error("Mongod Db uri envionment variable not set.")
        }
        if(mongodbURI.endsWith('/')){
            mongodbURI= mongodbURI.slice(0,-1);
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`);
    }catch(error){
        console.error("Error connecting to MongoDB:"+error);
    }
}

export default connectDb;