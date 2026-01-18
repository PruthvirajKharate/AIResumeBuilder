import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserScehma = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
},{timestamp:true})

UserScehma.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User",UserScehma);
export default User;