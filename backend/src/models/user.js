import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id:{type:String,unique : true , required: true},
    email:{type:String, required:true},
    name:{type:String },
    picture:{type:String}

})
const User = mongoose.model("User", userSchema);

export default User;